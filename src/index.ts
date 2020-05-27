import { isObj } from "./util";

interface IModalOptions {
    /**
     * Modal name
     * @default modal
     */
    name?: string;
    /**
     * Whether to automatically close the modal after the callback function is executed
     * @default true
     */
    selfClosing?: boolean;
}

export class Modal<T = any> {

    private options: IModalOptions;

    constructor(options: IModalOptions = {}) {
        this.options = Object.assign({ selfClosing: true }, options);
    }

    /**
     * Get modal visible status in data used in TSX.
     *
     * @example
     * {
     *      modal=new Modal({ name:"modal" });
     *      render(){
     *          return {this.modal.visible()&&(<View></View>)}
     *      }
     * }
     *
     */
    public visible() {
        return this.get('visible');
    }

    /**
     * Get modal data in data used in TSX.
     *
     * @example
     * {
     *      modal=new Modal({ name:"modal" });
     *      render(){
     *          return <MyComonent props={this.modal.data()}></MyComonent>
     *      }
     * }
     *
     */
    public data() {
        return this.get('data');
    }

    /**
     * Get modal success callback used in TSX.
     *
     * @example
     * {
     *      modal=new Modal({ name:"modal" });
     *      render(){
     *          return <MyComonent onSuccess={this.modal.success()}></MyComonent>
     *      }
     * }
     *
     */
    public success() {
        const key = this.get('success');
        if (!key) return;
        const target = this.target();
        return target[key] && target[key].bind(target);
    }

    /**
     * Get modal fail callback used in TSX.
     *
     * @example
     * {
     *      modal=new Modal({ name:"modal" });
     *      render(){
     *          return <MyComonent onFail={this.modal.fail()}></MyComonent>
     *      }
     * }
     *
     */
    public fail() {
        const key = this.get('fail');
        if (!key) return;
        const target = this.target();
        return target[key] && target[key].bind(target);
    }

    private get(key: 'visible' | 'data' | 'success' | 'fail') {
        if (!this.target) return;
        const target = this.target();
        const data = [target.data, target.state].find(item => item && item[this.options.name]);
        return data && data[this.options.name][key];
    }

    private target: () => any;

    /**
     * Bind for all modals in thisArg, the modal name will be set to it's property name if it's name is missing.
     * @param thisArg
     * @example
     *
     * Page({
     *      modal1:new Modal({ name:'modal1' });
     *      modal2:new Modal({ name:'modal2' });
     *      onLoad(){
     *          Modal.init(this);
     *      }
     * })
     */
    public static init(thisArg) {
        Object.keys(thisArg)
            .filter(key => thisArg[key] instanceof Modal)
            .forEach(key => thisArg[key].bind(thisArg, { name: key }))
    }

    /**
     * Bind this argument with page or component object for current modal.
     *
     * @param thisArg page or component object.
     * @param options modal options.
     * @example
     *
     * const modal=new Modal();
     * modal.bind(this);
     */
    public bind(thisArg, options?: IModalOptions) {
        this.target = () => thisArg;
        this.options = Object.assign({}, this.options, options);
        return this;
    }

    private setData(data) {
        const target = this.target();
        const setData = target.setData || target.setState;
        setData.call(target, data);
    }

    /**
     * Show modal.
     *
     * @param data modal data to set.
     * @param extra extra object data to set.
     * @example
     *
     * <button bind:tap="showModal">show modal</button>
     * <my-modal wx:if="{{modal.visible}}" props="{{modal.data}}" bind:complete="{{modal.success}}" bind:error="{{modal.fail}}"></my-modal>
     *
     * import { Modal } from 'mp-modal';
     *
     * Page({
     *      showModal(){
     *          new Modal({ name:'modal' })
     *              .bind(this)
     *              .show({...props})
     *              .then(()=>console.log('success'))
     *              .catch(()=>console.log('error'))
     *      }
     * })
     *
     */
    public show(data?: T, extra?: object): Promise<any> {
        const target = this.target();
        const name = this.options.name || 'modal';
        const success = `$modal_${name}_success_key`;
        const fail = `$modal_${name}_fail_key`;
        let promise = new Promise((resolve, reject) => {
            target[success] = resolve;
            target[fail] = reject;
        });
        this.setData({
            [name]: {
                data,
                fail,
                success,
                visible: true,
            },
            ...(isObj(extra) ? extra : {}),
        })
        if (this.options.selfClosing) {
            promise = promise.finally(() => this.hide());
        }
        return promise;
    }

    /**
     * Hide modal
     *
     * @example
     *
     * this.modal.hide()
     */
    public hide() {
        const name = this.options.name || 'modal';
        this.setData({ [name]: { visible: false } });
    }
}