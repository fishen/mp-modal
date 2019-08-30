import { isFn, isObj } from "./util";

export interface IModalProvider {
    setData(data: any, cb?: (...args: any[]) => any): void;
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
};
