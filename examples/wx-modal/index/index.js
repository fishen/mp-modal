import { Modal } from 'mp-modal';

const modal = new Modal({ name: 'modal' });

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
  showModal1() {
    modal.bind(this).show({
      title: 'modal title',
      content: 'modal content'
    })
      .then(e => console.log('confirmd', e))
      .catch(e => console.error(e));
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
  onModalClose(e) {
    this.hideModal();
    console.log('closed', e);
  }
})
