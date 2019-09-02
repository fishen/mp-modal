import Taro, { Component } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import './index.css'
import MyModal from '../modal/modal';

import { Modal, modal } from 'mp-modal';

const modal1 = new Modal();

export default class Index extends Component {

  @modal()
  modal2: Modal;

  showModal() {
    modal1.bind(this)
      .show({
        title: 'modal title',
        content: 'modal content'
      })
      .then((e) => console.log('confirmed', e))
      .catch(e => console.log('canceled or closed', e))
  }

  showModal2() {
    this.modal2
      .show({
        title: 'modal title2',
        content: 'modal content2'
      })
      .then((e) => console.log('confirmed', e))
      .catch(e => console.log('canceled or closed', e))
  }


  render() {
    const { visible, data, success, fail } = this.modal2;
    return (
      <View className='index'>
        <Button type="default" onClick={this.showModal.bind(this)} >Open Modal</Button>
        <Button type="default" onClick={this.showModal2.bind(this)} >Open Modal2</Button>
        <MyModal shown={modal1.visible} detail={modal1.data} onConfirm={modal1.success} onCancel={modal1.fail} onClose={modal1.fail} />
        <MyModal shown={visible} detail={data} onConfirm={success} onCancel={fail} onClose={fail} />
      </View >
    )
  }
}
