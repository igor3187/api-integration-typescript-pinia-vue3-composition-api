<script setup lang="ts">
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'

interface Props {
    title?: string;
    description?: string;
}

defineProps<Props>();

const isModalOpen = defineModel('isOpen', {
    required: true,
    type: Boolean,
});

const emit = defineEmits(['onClose']);
</script>

<template>
    <Dialog :open="isModalOpen" @update:open="emit('onClose')">
        <DialogContent>
            <DialogHeader>
                <DialogTitle v-if="title">{{ title }}</DialogTitle>
                <DialogDescription v-if="description">
                    {{ description }}
                </DialogDescription>
            </DialogHeader>
            <slot />
        </DialogContent>
    </Dialog>
</template>