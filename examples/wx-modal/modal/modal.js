Component({
    properties: {
        shown: Boolean,
        detail: Object,
    },
    methods: {
        onConfirm() {
            this.triggerEvent('confirm');
        },
        onCancel() {
            this.triggerEvent('cancel');
        },
        onClose() {
            this.triggerEvent('close');
        }
    }
})
