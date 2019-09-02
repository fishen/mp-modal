import { isFn, isObj, isStr } from "./util";

import { defaultProvider, IModalProvider } from "./provider";

export interface IModalData<T = any> {
    /**
     * The modal box display status
     */
    visible: boolean;
    /**
     * The  modal box binding data
     */
    data: T;
}

export interface IModalOptions {
    name?: string | symbol;
    /**
     * Whether to automatically close the modal, after calling the any callback function(success or fail).
     */
    selfClosing?: boolean;
    /**
     * The page or component object.
     */
    target?: any;
    /**
     * The success callback function's name for binding.
     */
    successKey?: string;
    /**
     * The failure callback function's name for binding.
     */
    failKey?: string;
}

export class Modal<T = any> {
    /**
     * Get the modal box display status
     */
    public get visible(): boolean {
        return this.getData("visible");
    }
    /**
     * Get the binding data by the modal box
     */
    public get data(): T {
        return this.getData("data");
    }
    /**
     * Get the registered success callback function.
     * It is generally used for the callback function of operation success, confirmation and other operations.
     */
    public get success(): (...args: any) => any {
        const { target, successKey } = this.options;
        return target && target[successKey];
    }
    /**
     * Get the registered failure function.
     * It can be a callback function for operations such as error handling, closing, and canceling events.
     */
    public get fail(): (...args: any) => any {
        const { target, failKey } = this.options;
        return target && target[failKey];
    }
    /**
     * The global system service provider
     */
    public static provider: IModalProvider = defaultProvider;
    protected options: IModalOptions;
    constructor(options?: IModalOptions) {
        const { name } = Object.assign({}, options);
        const traditional = isStr(name);
        this.options = Object.assign({
            failKey: traditional ? `${String(name)}Fail` : Symbol(),
            name: Symbol(),
            provider: defaultProvider,
            selfClosing: true,
            successKey: traditional ? `${String(name)}Success` : Symbol(),
        }, options);
    }
    /**
     * Get modal data with specific key.
     * @param key the key of modal data.
     */
    public getData(key: keyof IModalData<T>): any {
        const { target, name } = this.options;
        const modalData: IModalData = Modal.provider.getData.call(target, name);
        return modalData && modalData[key];
    }
    /**
     * Bind this argument with page or component object for current modal.
     * @param thisArg page or component object.
     * @example
     * const modal=new Modal({target: someObj})
     *
     * equals to
     *
     * const modal=new Modal();
     * modal.bind(someObj);
     */
    public bind(thisArg: any) {
        this.options = this.options || {} as any;
        this.options.target = thisArg;
        return this;
    }
    /**
     * Show modal.
     * @param data modal data to set.
     * @param extra extra object data to set.
     */
    public show(data?: T, extra?: object): Promise<any> {
        const { target, successKey, failKey, name, selfClosing } = this.options;
        if (!target) { throw new Error("Please bind this argument by bind method first."); }
        let promise = new Promise((resolve, reject) => {
            target[successKey] = resolve;
            target[failKey] = reject;
        });
        Modal.provider.setData.call(target, {
            [name]: { visible: true, data },
            ...(isObj(extra) && extra != null ? extra : {}),
        });
        if (selfClosing) {
            promise = promise.finally(() => this.hide());
        }
        return promise;
    }
    /**
     * Hide modal
     */
    public hide() {
        const { name, target } = this.options;
        const tmpData = { [name]: { visible: false } };
        Modal.provider.setData.call(target, tmpData);
    }
}

/**
 * Create a Modal instance through the decorator.
 * @param options modal options.
 */
export function modal(options?: Omit<IModalOptions, "target">) {
    return function(target: any, name: string) {
        let method = Modal.provider.modalBindMethod;
        method = isFn(method) ? (method as any)() : method;
        if (!isStr(method)) { throw new TypeError(`The "modalBindMethod" member of provider is required.`); }
        const original = target[method as string];
        target[name] = new Modal(Object.assign({ name }, options));
        target[method as string] = function(...args: any[]) {
            this[name].bind(this);
            if (isFn(original)) { return original.apply(this, args); }
        };
    };
}
