(function (e, a) {
  for (var i in a) e[i] = a[i];
})(exports, /******/function (modules) {
  // webpackBootstrap
  /******/ // The module cache
  /******/var installedModules = {};
  /******/
  /******/ // The require function
  /******/function __webpack_require__(moduleId) {
    /******/
    /******/ // Check if module is in cache
    /******/if (installedModules[moduleId]) {
      /******/return installedModules[moduleId].exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/var module = installedModules[moduleId] = {
      /******/i: moduleId,
      /******/l: false,
      /******/exports: {}
      /******/ };
    /******/
    /******/ // Execute the module function
    /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    /******/
    /******/ // Flag the module as loaded
    /******/module.l = true;
    /******/
    /******/ // Return the exports of the module
    /******/return module.exports;
    /******/
  }
  /******/
  /******/
  /******/ // expose the modules object (__webpack_modules__)
  /******/__webpack_require__.m = modules;
  /******/
  /******/ // expose the module cache
  /******/__webpack_require__.c = installedModules;
  /******/
  /******/ // define getter function for harmony exports
  /******/__webpack_require__.d = function (exports, name, getter) {
    /******/if (!__webpack_require__.o(exports, name)) {
      /******/Object.defineProperty(exports, name, { enumerable: true, get: getter });
      /******/
    }
    /******/
  };
  /******/
  /******/ // define __esModule on exports
  /******/__webpack_require__.r = function (exports) {
    /******/if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      /******/Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      /******/
    }
    /******/Object.defineProperty(exports, '__esModule', { value: true });
    /******/
  };
  /******/
  /******/ // create a fake namespace object
  /******/ // mode & 1: value is a module id, require it
  /******/ // mode & 2: merge all properties of value into the ns
  /******/ // mode & 4: return value when already ns object
  /******/ // mode & 8|1: behave like require
  /******/__webpack_require__.t = function (value, mode) {
    /******/if (mode & 1) value = __webpack_require__(value);
    /******/if (mode & 8) return value;
    /******/if (mode & 4 && typeof value === 'object' && value && value.__esModule) return value;
    /******/var ns = Object.create(null);
    /******/__webpack_require__.r(ns);
    /******/Object.defineProperty(ns, 'default', { enumerable: true, value: value });
    /******/if (mode & 2 && typeof value != 'string') for (var key in value) __webpack_require__.d(ns, key, function (key) {
      return value[key];
    }.bind(null, key));
    /******/return ns;
    /******/
  };
  /******/
  /******/ // getDefaultExport function for compatibility with non-harmony modules
  /******/__webpack_require__.n = function (module) {
    /******/var getter = module && module.__esModule ?
    /******/function getDefault() {
      return module['default'];
    } :
    /******/function getModuleExports() {
      return module;
    };
    /******/__webpack_require__.d(getter, 'a', getter);
    /******/return getter;
    /******/
  };
  /******/
  /******/ // Object.prototype.hasOwnProperty.call
  /******/__webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  };
  /******/
  /******/ // __webpack_public_path__
  /******/__webpack_require__.p = "";
  /******/
  /******/
  /******/ // Load entry module and return exports
  /******/return __webpack_require__(__webpack_require__.s = 1);
  /******/
}(
/************************************************************************/
/******/[
/* 0 */
/***/function (module, exports, __webpack_require__) {

  "use strict";

  Object.defineProperty(exports, "__esModule", { value: true });
  function isFn(fn) {
    return typeof fn === "function";
  }
  exports.isFn = isFn;
  function isObj(obj) {
    return typeof obj === "object";
  }
  exports.isObj = isObj;
  function isStr(str) {
    return typeof str === "string";
  }
  exports.isStr = isStr;

  /***/
},
/* 1 */
/***/function (module, exports, __webpack_require__) {

  "use strict";

  var __assign = this && this.__assign || function () {
    __assign = Object.assign || function (t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
    };
    return __assign.apply(this, arguments);
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var util_1 = __webpack_require__(0);
  var provider_1 = __webpack_require__(2);
  var Modal = /** @class */function () {
    function Modal(options) {
      var name = Object.assign({}, options).name;
      var traditional = util_1.isStr(name);
      this.options = Object.assign({
        failKey: traditional ? String(name) + "Fail" : Symbol(),
        name: Symbol(),
        provider: provider_1.defaultProvider,
        selfClosing: true,
        successKey: traditional ? String(name) + "Success" : Symbol()
      }, options);
    }
    Object.defineProperty(Modal.prototype, "visible", {
      /**
       * Get the modal box display status
       */
      get: function () {
        var _a = this.options,
            target = _a.target,
            name = _a.name,
            provider = _a.provider;
        var modalData = provider.getData.call(target, name);
        return modalData && modalData.visible;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Modal.prototype, "data", {
      /**
       * Get the binding data by the modal box
       */
      get: function () {
        var _a = this.options,
            target = _a.target,
            name = _a.name,
            provider = _a.provider;
        var modalData = provider.getData.call(target, name);
        return modalData && modalData.data;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Modal.prototype, "success", {
      /**
       * Get the registered success callback function.
       * It is generally used for the callback function of operation success, confirmation and other operations.
       */
      get: function () {
        var _a = this.options,
            target = _a.target,
            successKey = _a.successKey;
        return target && target[successKey];
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Modal.prototype, "fail", {
      /**
       * Get the registered failure function.
       * It can be a callback function for operations such as error handling, closing, and canceling events.
       */
      get: function () {
        var _a = this.options,
            target = _a.target,
            failKey = _a.failKey;
        return target && target[failKey];
      },
      enumerable: true,
      configurable: true
    });
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
    Modal.prototype.bind = function (thisArg) {
      this.options = this.options || {};
      this.options.target = thisArg;
      return this;
    };
    /**
     * Show modal.
     * @param data modal data.
     * @param extra extra object data to set.
     */
    Modal.prototype.show = function (data, extra) {
      var _a;
      var _this = this;
      var _b = this.options,
          target = _b.target,
          provider = _b.provider,
          successKey = _b.successKey,
          failKey = _b.failKey,
          name = _b.name,
          selfClosing = _b.selfClosing;
      if (!target) {
        throw new Error("Please bind this argument by bind method first.");
      }
      var promise = new Promise(function (resolve, reject) {
        target[successKey] = resolve;
        target[failKey] = reject;
      });
      provider.setData.call(target, __assign((_a = {}, _a[name] = { visible: true, data: data }, _a), util_1.isObj(extra) && extra != null ? extra : {}));
      if (selfClosing) {
        promise = promise.finally(function () {
          return _this.hide();
        });
      }
      return promise;
    };
    /**
     * Hide modal
     */
    Modal.prototype.hide = function () {
      var _a;
      var _b = this.options,
          name = _b.name,
          provider = _b.provider,
          target = _b.target;
      var tmpData = (_a = {}, _a[name] = { visible: false }, _a);
      provider.setData.call(target, tmpData);
    };
    return Modal;
  }();
  exports.Modal = Modal;

  /***/
},
/* 2 */
/***/function (module, exports, __webpack_require__) {

  "use strict";

  Object.defineProperty(exports, "__esModule", { value: true });
  var util_1 = __webpack_require__(0);
  exports.defaultProvider = {
    setData: function (data, cb) {
      if (!util_1.isObj(this)) {
        throw new Error();
      }
      var set = this.setData || this.setState;
      // tslint:disable-next-line
      util_1.isFn(set) && set.call(this, data, cb);
    },
    getData: function (key) {
      var data = this && (this.data || this.state);
      if (util_1.isObj(data)) {
        return data[key];
      }
    }
  };

  /***/
}]
/******/));
//# sourceMappingURL=index.js.map