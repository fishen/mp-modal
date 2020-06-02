(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modal = void 0;
var util_1 = __webpack_require__(1);
var Modal = /** @class */ (function () {
    function Modal(options) {
        if (options === void 0) { options = {}; }
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
    Modal.prototype.visible = function () {
        return this.get('visible');
    };
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
    Modal.prototype.data = function () {
        return this.get('data');
    };
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
    Modal.prototype.success = function () {
        var key = this.get('success');
        if (!key)
            return;
        var target = this.target();
        return target[key] && target[key].bind(target);
    };
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
    Modal.prototype.fail = function () {
        var key = this.get('fail');
        if (!key)
            return;
        var target = this.target();
        return target[key] && target[key].bind(target);
    };
    Modal.prototype.get = function (key) {
        var _this = this;
        if (!this.target)
            return;
        var target = this.target();
        var data = [target.data, target.state].find(function (item) { return item && item[_this.options.name]; });
        return data && data[this.options.name][key];
    };
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
    Modal.init = function (thisArg) {
        Object.keys(thisArg)
            .filter(function (key) { return thisArg[key] instanceof Modal; })
            .forEach(function (key) { return thisArg[key].bind(thisArg, { name: thisArg[key].options.name || key }); });
    };
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
    Modal.prototype.bind = function (thisArg, options) {
        this.target = function () { return thisArg; };
        this.options = Object.assign({}, this.options, options);
        return this;
    };
    Modal.prototype.setData = function (data) {
        var target = this.target();
        var setData = target.setData || target.setState;
        setData.call(target, data);
    };
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
    Modal.prototype.show = function (data, extra) {
        var _a;
        var _this = this;
        var target = this.target();
        var name = this.options.name || 'modal';
        var success = "$modal_" + name + "_success_key";
        var fail = "$modal_" + name + "_fail_key";
        var promise = new Promise(function (resolve, reject) {
            target[success] = resolve;
            target[fail] = reject;
        });
        this.setData(__assign((_a = {}, _a[name] = {
            data: data,
            fail: fail,
            success: success,
            visible: true,
        }, _a), (util_1.isObj(extra) ? extra : {})));
        if (this.options.selfClosing) {
            promise = promise.finally(function () { return _this.hide(); });
        }
        return promise;
    };
    /**
     * Hide modal
     *
     * @example
     *
     * this.modal.hide()
     */
    Modal.prototype.hide = function () {
        var _a;
        var name = this.options.name || 'modal';
        this.setData((_a = {}, _a[name] = { visible: false }, _a));
    };
    return Modal;
}());
exports.Modal = Modal;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.isObj = void 0;
function isObj(obj) {
    var toString = Object.prototype.toString;
    return toString.call(obj) === toString.call({});
}
exports.isObj = isObj;


/***/ })
/******/ ])));
//# sourceMappingURL=index.js.map