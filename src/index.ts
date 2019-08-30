import { isObj, isStr } from "./util";

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
    /**
     * The system service provider
     */
    provider?: IModalProvider;
    /**
     * The name for setting modal data.
     */
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
        const { target, name, provider } = this.options;
        const modalData: IModalData = provider.getData.call(target, name);
        return modalData && modalData.visible;
    }
    /**
     * Get the binding data by the modal box
     */
    public get data(): T {
        const { target, name, provider } = this.options;
        const modalData: IModalData = provider.getData.call(target, name);
        return modalData && modalData.data;
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
     * Bind this argument with page or component object.
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
     * @param data modal data.
     * @param extra extra object data to set.
     */
    public show(data?: T, extra?: object): Promise<any> {
        const { target, provider, successKey, failKey, name, selfClosing } = this.options;
        if (!target) { throw new Error("Please bind this argument by bind method first."); }
        let promise = new Promise((resolve, reject) => {
            target[successKey] = resolve;
            target[failKey] = reject;
        });
        provider.setData.call(target, {
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
        const { name, provider, target } = this.options;
        const tmpData = { [name]: { visible: false } };
        provider.setData.call(target, tmpData);
    }
}
