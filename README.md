# mp-modal
A helper cross-platform tool for muti-miniprograms that can more convenient to use modal components.

# Installation

>`$ npm install --save mp-modal`

# Getting started
## Traditional way(no mp-modal)

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
```
import { Component } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import MyModal from '../modal/modal';

import { Modal } from 'mp-modal';

const modal = new Modal();

export default class Index extends Component {

  showModal() {
    modal.bind(this)
      .show({
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
* **options**(optional): modal options.
* * **provider**(optional, object): The system service provider, created automatically by default.
* * * **setData**((data: any, cb?: Function)=>void): Set data from thisArg(page or component object), use *setData* or *setState* by default.
* * * **getData**((key: string)=>any): Get data from thisArg(page or component object), get from *data* or *state* by default.
* * **name**(optional, string): Modal name which must be set in the native miniprogram.
* * **selfClosing**(optional, boolean): Whether to automatically close the modal, after calling the any callback function(success or fail).
* * **target**(optional, object): The page or component object.
* * **successKey**(optional, string): The success callback function's name for binding.
* * **failKey**(optional, string): The failure callback function's name for binding.
```
import { i18n } from 'mp-modal';

const baseUrl = 'https://raw.githubusercontent.com/fishen/assets/master/wx-i18n';
const version = '1.0.0';
i18n.config({
  lang: 'zh',
  debug: true,
  indexUrl: () => `${baseUrl}/${version}/index.json`,
  textsUrl: (hash) => `${baseUrl}/${version}/${hash}.json`
})
```
## bind(target: object):void;
## show(data:any, extra?:object):Promise<any>;
Format a template string with the specified parameter.
>If the variable matching flag(left and right) contains special characters, please use the character '\\' to escape, such as { left:"\\\\${" }.
* **template**: the template string.
* **params**: the parameter object to format template.
* **options**: formatting options.
* * **left**(optional, string): The variable matching start flag, default is '{'.
* * **right**(optional, string): The variable matching end flag, default is '}'.
* * **defaultValue**(optional, string | object): the default value for formatting, default is ''.
```
import { i18n } from 'mp-modal';

i18n.format('hello, {world}!', { world:'fisher' })
i18n.format('hello, {world}!', {},{ defaultValue:'world' })
i18n.format('{hello}, {world}!', {},{ defaultValue:{ hello:'hi', world:'world' })
i18n.format('hello, ${world}!', { world:'fisher' }, { left:"\\${" })
```
```
// output:
hello, fisher!
hello, world!
hi, world!
hello, fisher!
```
## hide()
Get index resource, the index resource request will only be called once between the entire  lifecycle and will be re-requested at the next time the program restart. In addition only one request will be initiated at the same time.
* **options**: resource options.
* * **forced**(optional, boolean): whether to require a forced refresh.
```
import { i18n } from 'mp-modal';

Page({
  onLoad(){
    i18n.getIndex().then(console.log);
  }
})
```
```
{ "pages/index/index":"d41d8cd98f00b204e9800998ecf8427e" }
```
## getTexts( options?: object )
Get original i18n resources for the corresponding page or componet (default is current page).
* **options**: resource options.
* * **path**(optional, string): the resource(page or component) path, default get current path by 'getCurrentPages'.
* * **texts**(optional, object): local texts resource, if not set, it will fetch from the remote.
```
import { i18n } from 'mp-modal';

Page({
  onLoad(){
    i18n.getTexts().then(console.log);
  }
})
```
```
{
  "zh":{"hello":"你好","world":"世界","welcome":"{hello}，{world}。"},
  "en":{"hello":"Hello","world":"World","welcome":"{hello}, {world}."}
}
```
## language
Get or set current language.
## load( thisArg: any, options?: object )
Load curennt language's resources and bind to the corresponding page or componet (default is current page).
* **thisArg**: page or component object.
* **options**: load options.
* * **path**(optional, string): the resource(page or component) path, default get current path by 'getCurrentPages'.
* * **texts**(optional, object): local texts resource, if not set, it will fetch from the remote.
* * **tempVar**(optional, string): variable name used in the template, default is '$t'.
* * **langVar**(optional, string): current language variable name, default is '$lang'.
```
import { i18n } from 'mp-modal';

Page({
  onLoad(){
    //local mode
    const texts={ zh: { hi: '嗨' }, en: { hi: 'Hi' } };
    i18n.load(this, { texts }).then(console.log)
    //remote mode
    i18n.load(this).then(console.log);
  }
})

<view>current language is {{$lang}}</view>
<view>{{$t.hello}}</view>
```
```
{hi: "嗨"}
{hello: "你好", world: "世界", welcome: "{hello}，{world}。"}

current language is zh
你好
```
## mergetTexts(texts: object, lang?: string)
Merge texts by specified or current language.
* **texts**: the multi-language texts.
* **lang**: the specified language, default use current language.
```
import { i18n } from 'mp-modal';

i18n.mergetTexts({ zh: { hi:'你好' }, en: { hi:'Hi' } },'en'); 
```
```
{ hi:'Hi' }
```
# Customize
## API provider
By default, provider is automatically created based on the environment. If you want to change the default behavior, set the provider option when calling the config method.
> You can create a custom provider more easily by inheriting the **DefaultProvider**.
```
import { i18n } from 'mp-modal';

class MyProvider{
    request(params){
      // set headers and other operations
    },
    getStorage(params){},
    ...others
}

i18n.config({
  provider: new MyProvider();
  ...others
})
```
For the complete provider definition, please refer to the following interface.
```
export interface IProvider {
    getSetData(p: any): (data: any, callback?: () => void) => void;
    request(params: { url: string }): Promise<{ data: any, statusCode: number, header: object }>;
    getStorageInfo(): Promise<{ keys: string[] }>;
    removeStorage(params: { key: string }): Promise<any>;
    setStorage(params: { key: string, data: any }): Promise<any>;
    getStorage(params: { key: string }): Promise<{ data: any }>;
    getStorageSync(key: string): any;
    getCurrentPages(): [{ route: string }];
}
```
# Resource structure required
## Index file
The file includes all path and version(hash value) info.
```
{
  [page or component path]:[text resource hash value],
  "pages/home/home":"84b7f497e34e10725c4dfdf389e092b8",
  "pages/log/log":"30c481699e53cfc6b490be924ce7f4b8"
}
```
## Resource file
The file include multi-language text resources
```
{
  [lang]: {
    [key] : [value]
  },
  "zh": {
    "hello":"你好",
    "world":"世界",
    "welcome":"{hello}，{world}。"
  },
  "en": {
    "hello" : "Hello",
    "world" : "World",
    "welcome":"{hello}, {world}."
  }
}
```


