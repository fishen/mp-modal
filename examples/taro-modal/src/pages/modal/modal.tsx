import Taro, { Component } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import './modal.css'
import { StandardProps } from '@tarojs/components/types/common';

interface IModalProps extends StandardProps {
    shown: boolean;
    detail: { title: string, content: string };
    onConfirm: (e) => void;
    onCancel: (e) => void;
    onClose: (e) => void;
}

export default class Modal extends Component<IModalProps> {
    render() {
        const { shown, detail, onConfirm, onCancel, onClose } = this.props;
        return (
            <View className="modal-container" hidden={!shown}>
                <View className="modal">
                    <View className="title">{detail.title}</View>
                    <View className="content">{detail.content}</View>
                    <View className="btns">
                        <Button onClick={onConfirm}>Confirm</Button>
                        <Button onClick={onCancel}>Cancel</Button>
                        <Button onClick={() => onClose({ type: 'close' })}>Close</Button>
                    </View>
                </View>
            </View>
        )
    }
}

