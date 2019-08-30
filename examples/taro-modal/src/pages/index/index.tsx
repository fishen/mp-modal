import Taro, { Component } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import './index.css'
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
    return (
      <View className='index'>
        <Button type="default" onClick={this.showModal.bind(this)} >Open Modal</Button>
        <MyModal shown={modal.visible} detail={modal.data} onConfirm={modal.success} onCancel={modal.fail} onClose={modal.fail} />
      </View >
    )
  }
}
