declare module "mp-modal/src/util" {
    export function isFn(fn: any): boolean;
    export function isObj(obj: any): boolean;
    export function isStr(str: any): boolean;
}
declare module "mp-modal/src/provider" {
    export interface IModalProvider {
        /**
         * The lifecycle function to bind modals when use decorator modal.
         * default is componentWillMount or onReady
         */
        modalBindMethod: string | (() => string);
        /**
         * the function to set modal data for current page or component.
         * default use this.setData or this.setState
         */
        setData(data: any, cb?: (...args: any[]) => any): void;
        /**
         * the function to get modal data from current page or component.
         * defaut get value from this.data or this.state
         */
        getData(key: string): any;
    }
    export const defaultProvider: {
        setData(data: any, cb: any): void;
        getData(key: string): any;
        modalBindMethod(): "componentWillMount" | "onReady";
    };
}
declare module "mp-modal" {
    import { IModalProvider } from "mp-modal/src/provider";
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
        readonly visible: boolean;
        /**
         * Get the binding data by the modal box
         */
        readonly data: T;
        /**
         * Get the registered success callback function.
         * It is generally used for the callback function of operation success, confirmation and other operations.
         */
        readonly success: (...args: any) => any;
        /**
         * Get the registered failure function.
         * It can be a callback function for operations such as error handling, closing, and canceling events.
         */
        readonly fail: (...args: any) => any;
        /**
         * The global system service provider
         */
        static provider: IModalProvider;
        protected options: IModalOptions;
        constructor(options?: IModalOptions);
        /**
         * Get modal data with specific key.
         * @param key the key of modal data.
         */
        getData(key: keyof IModalData<T>): any;
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
        bind(thisArg: any): this;
        /**
         * Show modal.
         * @param data modal data to set.
         * @param extra extra object data to set.
         */
        show(data?: T, extra?: object): Promise<any>;
        /**
         * Hide modal
         */
        hide(): void;
    }
    /**
     * Create a Modal instance through the decorator.
     * @param options modal options.
     */
    export function modal(options?: Omit<IModalOptions, "target">): (target: any, name: string) => void;
}