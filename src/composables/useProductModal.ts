import { reactive, toRefs } from 'vue'

const state = reactive({
    isModalOpen: false,
})

export default () => {
    const { isModalOpen } = toRefs(state);
    const onOpen = () => state.isModalOpen = true;
    const onClose = () => state.isModalOpen = false;

    return {
        isModalOpen,
        onOpen,
        onClose,
    }
}
