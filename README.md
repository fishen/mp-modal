# mp-modal
A helper cross-platform tool for miniprograms that can more convenient to use modal components.

# Installation

>`$ npm install --save mp-modal`

# Getting started
## Traditional way(no mp-modal)

```js
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

```
```xml
<!--page/index/index.wxss-->
<button type="default" bindtap="showModal" >Open Modal</button>
<modal shown="{{visible}}" detail="{{detail}}" bindconfirm="onModalConfirm" bindcancel="onModalCancel" bindclose="onModalCancel"></modal>
```
## With mp-modal
```js
//pages/index/index.js
import { Modal } from 'mp-modal';

const modal = new Modal({ name: 'modal' });

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
```
```xml
<!--pages/index/index.wxml-->
<button type="default" bindtap="showModal" >Open Modal</button>
<modal shown="{{modal.visible}}" detail="{{modal.data}}" bindconfirm="{{modal.success}}" bindcancel="{{modal.fail}}" bindclose="{{modal.fial}}"></modal>
```
## Use mp-modal with Taro
```tsx
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
        <MyModal shown={modal.visible()} detail={modal.data()} onConfirm={modal.success()} onCancel={modal.fail()} onClose={modal.fail()} />
      </View >
  }
}
```

# API
## constructor(options?: object)
The modal constructor.
>In a native miniprogram application, the *name* option must be set and must be a string type of data.

* **name**(optional, string): The modal name which must be set in the native miniprogram used to get modal's data. default is 'modal'.
* **selfClosing**(optional, boolean): Whether to automatically close the modal, after calling the any callback function(success or fail), default is `true`.

```js
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

<modal shown="{{modal.visible}}" bindconfirm="{{modal.success}}" bindcancel="{{modal.fail}}"/>
```
## bind(target: object): void;
Bind this argument(page or component object) for current modal. You must bind a page or component object for current modal **before calling the show** method.
```js
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
## hide()
Hide the modal.
>The show method will invoke method `setData` to bind data `{[name]:{visible:false}}` for current page or component.
## show(data?: any, extra?: object): Promise\<any>;
Show modal.
* **data**: modal data to set.
* **extra**: extra object data to set.
>The show method will invoke method `setData` to bind data `{[name]:{data, visible:true},...extra}` for current page or component.
```js
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

<modal shown="{{modal.visible}}" bindconfirm="{{modal.success}}" bindcancel="{{modal.fail}}"/>
```
# METHODS
The methods can be easily used in the taro framework.
## data(): any
Get the binding data by the modal box, in the native program, you can get it by `${name}.data`.
```tsx
// taro
const modal = new Modal();
<MyModal detail={modal.data()} />
// native miniprogram
const modal=new Modal({ name:'myModal' });
<my-modal data="{{myModal.data}}"/>
```
## fail(): function
Get the registered failure function, in the native program, you can get it by `{{modal.fail}}` by default.
```js
//taro
const modal = new Modal();
```
```xml
<MyModal onFail={modal.fail()} />
<!--native miniprogram-->
const modal=new Modal({ name:'myModal' });
<my-modal bindfail="{{myModal.fail}}"/>
```
## success(): function
Get the registered success callback function, in the native program, you can get it by `{{modal.success}}` by default.
```js
//taro
const modal = new Modal();
<MyModal onFail={modal.success()} />
```
```js
//native miniprogram
const modal=new Modal({ name:'myModal' });
<my-modal bindsuccess="{{myModal.success}}"/>
```
## visible(): boolean
Get the modal box display status, in the native program, you can get it by `{{modal.visible}}`.
```js
//taro
const modal = new Modal();
{ modal.visible()&&<MyModal /> }
//native miniprogram
const modal=new Modal({ name:'myModal' });
<my-modal wx:if="{{myModal.visible}}"/>
```
# Also see
[mp-event](https://www.npmjs.com/package/mp-event): a simple event subscription publishing system implementation;

[mp-i18n](https://www.npmjs.com/package/mp-i18n): a cross-platform i18n library for muti-miniprograms (wx、alipay、baidu、tt);

[mp-mem](https://www.npmjs.com/package/mp-mem): a lightweight memoize library that can be used on both normal functions and class methods;

[auto-mapping](https://www.npmjs.com/package/auto-mapping): map and convert objects automatically in typescript;