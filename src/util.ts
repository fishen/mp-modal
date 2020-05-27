export function isObj(obj: any): obj is object {
    const toString = Object.prototype.toString;
    return toString.call(obj) === toString.call({});
}