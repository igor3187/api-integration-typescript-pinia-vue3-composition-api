<script setup lang="ts">
import { useDropZone, useFileDialog } from '@vueuse/core'
import { ref } from 'vue'

const mainImageDropZoneRef = ref<HTMLDivElement>();
const emit = defineEmits(['onDrop', 'onChange']);
const props = defineProps<{ multiple: boolean }>();

function onDrop(files: File[] | null) {
    emit('onDrop', files)
}

const { isOverDropZone } = useDropZone(mainImageDropZoneRef, {
    onDrop,
});

const { open, onChange } = useFileDialog({
    accept: 'image/*',
    multiple: props.multiple,
});

onChange((files) => {
    emit('onChange', files);
})
</script>

<template>
    <!-- @vue-expect-error -->
    <div ref="mainImageDropZoneRef"
         class="rounded-lg h-40 border dark:border-gray-600 flex flex-col items-center justify-center mt-2 transition-all overflow-hidden"
         :class="{'animate-pulse ring-4 ring-teal-500 bg-teal-50 border-teal-500 dark:border-teal-400 ring-opacity-20' : isOverDropZone}"
         @click="open"
    >
        <div class="text-center cursor-pointer">
            <p>Drag some files here</p>
            <p class="text-xs mt-1 text-gray-500">or click here to upload</p>
        </div>
    </div>
</template>

<style scoped>

</style>