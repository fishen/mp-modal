declare module "mp-modal/src/util" {
    export function isFn(fn: any): boolean;
    export function isObj(obj: any): boolean;
    export function isStr(str: any): boolean;
}
declare module "mp-modal/src/provider" {
    export interface IModalProvider {
        setData(data: any, cb?: (...args: any[]) => any): void;
        getData(key: string): any;
    }
    export const defaultProvider: {
        setData(data: any, cb: any): void;
        getData(key: string): any;
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
        protected options: IModalOptions;
        constructor(options?: IModalOptions);
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
        bind(thisArg: any): this;
        /**
         * Show modal.
         * @param data modal data.
         * @param extra extra object data to set.
         */
        show(data?: T, extra?: object): Promise<any>;
        /**
         * Hide modal
         */
        hide(): void;
    }
}