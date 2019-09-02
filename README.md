# mp-modal
A helper cross-platform tool for miniprograms that can more convenient to use modal components.

# Installation

>`$ npm install --save mp-modal`

# Getting started
## Traditional way(no mp-modal)

>For more modal component details, please see the [example](https://github.com/fishen/mp-modal/tree/master/examples/wx-modal/modal)

```
// pages/index/index.js

Page({
  showModal() {
    this.setData({
      visible: true,
      detail: {
        title: 'modal title',
        content: 'modal content'
      }
    })
  },
  hideModal() {
    this.setData({ visible: false })
  },
  onModalConfirm(e) {
    this.hideModal();
    console.log('confirmd', e);
  },
  onModalCancel(e) {
    this.hideModal();
    console.log('canceled', e);
  },
})

// page/index/index.wxss
<button type="default" bindtap="showModal" >Open Modal</button>

<modal shown="{{visible}}" detail="{{detail}}" bindconfirm="onModalConfirm" bindcancel="onModalCancel" bindclose="onModalCancel"></modal>
```
## With mp-modal
```
//pages/index/index.js
import { Modal } from 'mp-modal';

const modal = new Modal({name: 'modal'});

Page({
  showModal() {
    modal.bind(this).show({
      title: 'modal title',
      content: 'modal content'
    })
      .then(e => console.log('confirmd', e))
      .catch(e => console.error(e));
  }
})

//pages/index/index.wxml
<button type="default" bindtap="showModal" >Open Modal</button>

<modal shown="{{modal.visible}}" detail="{{modal.data}}" bindconfirm="modalSuccess" bindcancel="modalFail" bindclose="modalFail"></modal>
```
## Use mp-modal with taro
>For more MyModal component details, please see the [example](https://github.com/fishen/mp-modal/tree/master/examples/taro-modal)
```
import { Component } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import MyModal from '../modal/modal';

import { Modal } from 'mp-modal';

const modal = new Modal();

export default class Index extends Component {

  showModal() {
    modal.bind(this).show({
        title: 'modal title',
        content: 'modal content'
      })
      .then((e) => console.log('confirmed', e))
      .catch(e => console.log('canceled or closed', e))
  }

  render() {
    return 
      <View className='index'>
        <Button type="default" onClick={this.showModal.bind(this)} >Open Modal</Button>
        <MyModal shown={modal.visible} detail={modal.data} onConfirm={modal.success} onCancel={modal.fail} onClose={modal.fail} />
      </View >
  }
}
```

# API
## constructor(options?: object)
The modal constructor.
>In a native miniprogram application, the *name* option must be set and must be a string type of data.
* **options**(optional): modal options.
* * **provider**(optional, object): The system service provider, created automatically by default.
* * * **setData**((data: any, cb?: Function)=>void): Set data from thisArg(page or component object), use *setData* or *setState* by default.
* * * **getData**((key: string)=>any): Get data from thisArg(page or component object), get from *data* or *state* by default.
* * **name**(optional, string): The modal name which must be set in the native miniprogram used to get modal's data.
* * **selfClosing**(optional, boolean): Whether to automatically close the modal, after calling the any callback function(success or fail), default is `true`.
* * **target**(optional, object): The page or component object.
* * **successKey**(optional, string): The success callback function's name for binding. The default value is `${name}Success` when the name option is set to a string, in addition, the default value is `Symbol()`.
* * **failKey**(optional, string): The failure callback function's name for binding. The default value is `${name}Fail` when the name option is set to a string, in addition, the default value is `Symbol()`.
```
import { Modal } from 'mp-modal';

const modal = new Modal({ name: 'myModal' });

Page({
  onRead(){
    modal.bind(this);
  },
  showModal(){
    modal.show();
  }
})

<modal shown="{{modal.visible}}" bindconfirm="myModalSuccess" bindcancel="myModalFail"/>
```
## bind(target: object): void;
Bind this argument(page or component object) for current modal. You must bind a page or component object for current modal **before calling the show** method.
```
import { Modal } from 'mp-modal';

const modal=new Modal({name:'myModal'});

Page({
  onRead(){
    modal.bind(this);
  },
  showModal(){
    modal.show();
  }
})

```
or 
```
Page({
  onRead(){
    this.modal=new Modal({ target: this });
  },
  showModal(){
    modal.show();
  }
})
```
## getData(key: string): any
Get modal data with specific key.
* **key**: the key of modal data, the valid values includes 'visible' and 'data'.
```
//taro example

const modal=new Modal();

{ modal.getData('visible')&&<MyModal/> }
```
## hide()
Hide the modal.
>The show method will invoke method `setData` to bind data `{[name]:{visible:false}}` for current page or component.
## show(data?: any, extra?: object): Promise\<any>;
Show modal.
* **data**: modal data to set.
* **extra**: extra object data to set.
>The show method will invoke method `setData` to bind data `{[name]:{data, visible:true},...extra}` for current page or component.
```
import { Modal } from 'mp-modal';

const modal=new Modal({name: 'myModal'});

Page({
  showModal(){
    modal.bind(this)
    .show()
    .then(e=>{}) // success callback function
    .catch(err=>{}); // fail callback function
  }
})

<modal shown="{{modal.visible}}" bindconfirm="myModalSuccess" bindcancel="myModalFail"/>
```
# Getters
The getters can be easily used in the taro framework.
## data: any
Get the binding data by the modal box, in the native program, you can get it by `${name}.data`.
```
//taro
const modal = new Modal();
<MyModal detail={modal.data} />
//native miniprogram
const modal=new Modal({name:'myModal'});
<my-modal data="{{myModal.data}}"/>
```
## fail: function
Get the registered failure function, in the native program, you can get it by `${name}Fail` by default.
```
//taro
const modal = new Modal();
<MyModal onFail={modal.fail} />
//native miniprogram
const modal=new Modal({name:'myModal'});
<my-modal bindfail="myModalFail"/>
```
## success: function
Get the registered success callback function, in the native program, you can get it by `${name}Success` by default.
```
//taro
const modal = new Modal();
<MyModal onFail={modal.success} />
//native miniprogram
const modal=new Modal({name:'myModal'});
<my-modal bindsuccess="myModalSuccess"/>
```
## visible: boolean
Get the modal box display status, in the native program, you can get it by `${name}.visible`.
```
//taro
const modal = new Modal();
<MyModal detail={modal.visible} />
//native miniprogram
const modal=new Modal({name:'myModal'});
<my-modal wx:if="{{myModal.visible}}"/>
```
# Decorators
## modal(options?: object)
Create a Modal instance through the decorator. By default, the bind method is called automatically when the page is initialized. You can determine which method to initialize in by configuring the `modalBindMethod` option in the provider. The default is `componentWillMount`(in taro) or `onReady`.
>The modal decorator will set the modal name property to the current decoration attribute name.
```
// taro example
import Taro, { Component } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import MyModal from '../modal/modal';

export default class Index extends Component {

  @modal()
  modal2: Modal;

  showModal(){
    this.modal2.show().then(console.log).catch(console.error);
  }

  render(){
    const { visible, data, success, fail } = this.modal2;
    return (
      <View className='index'>
        <Button type="default" onClick={this.showModal2.bind(this)} >Open Modal2</Button>
        <MyModal shown={visible} detail={data} onConfirm={success} onCancel={fail} onClose={fail} />
      </View >
    )
  }
}
```
# Customize
## API provider
By default, provider is automatically created based on the environment. If you want to change the default behavior, set the `provider` option as a static property of Modal class.
```
import { Modal } from 'mp-modal';

//default configuration for taro
Modal.provider={
  modalBindMethod: 'componentWillMount',
  setData: function(data, cb){ this.setState(data,cb); },
  getData: function(key){ return this.state[key] }
}

```
For the complete provider definition, please refer to the following interface.
```
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
```
# Also see
[mp-event](https://www.npmjs.com/package/mp-event): a simple event subscription publishing system implementation;

[mp-i18n](https://www.npmjs.com/package/mp-i18n): a cross-platform i18n library for muti-miniprograms (wx、alipay、baidu、tt);

[mp-mem](https://www.npmjs.com/package/mp-mem): a lightweight memoize library that can be used on both normal functions and class methods;

[auto-mapping](https://www.npmjs.com/package/auto-mapping): map and convert objects automatically in typescript;