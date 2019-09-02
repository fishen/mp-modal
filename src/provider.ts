import { isFn, isObj } from "./util";

declare var global;

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

export const defaultProvider = {
    setData(data: any, cb) {
        if (!isObj(this)) { throw new Error(); }
        const set = this.setData || this.setState;
        // tslint:disable-next-line
        isFn(set) && set.call(this, data, cb);
    },
    getData(key: string) {
        const data = this && (this.data || this.state);
        if (isObj(data)) {
            return data[key];
        }
    },
    modalBindMethod() {
        if (global && global.$gaic) {
            return "componentWillMount";
        } else {
            return "onReady";
        }
    },
};
