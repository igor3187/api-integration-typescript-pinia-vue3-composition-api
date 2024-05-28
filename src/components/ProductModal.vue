<script setup lang="ts">
import Modal from '@/components/ui/Modal.vue'
import useProductModal from '@/composables/useProductModal'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { computed, ref } from 'vue'
import { useCategoryStore } from '@/stores/categoryStore'
import { useProductStore } from '@/stores/productStore'
import FileUploader from '@/components/FileUploader.vue'
import { useObjectUrl } from '@vueuse/core'
import { Button } from '@/components/ui/button'
import { useGlobalLoader } from 'vue-global-loader'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'

const { displayLoader, destroyLoader } = useGlobalLoader();
const categoryStore = useCategoryStore();
const productStore = useProductStore();
const categories = computed(() => categoryStore.categoriesData.categories);
const mainImagePreview = ref<string[]>([]);
const subImagesPreviews = ref<string[]>([]);
const { isModalOpen, onClose } = useProductModal();

type PAYLOAD = {
    name: string,
    price: number,
    stock: number,
    mainImage: File | undefined,
    subImages: File | undefined,
    description: string,
    category: string | undefined,
}

const form = ref<PAYLOAD>({
    name: 'Product',
    price: 10,
    stock: 10,
    mainImage: undefined,
    subImages: undefined,
    description: 'Lorem ipsum',
    category: undefined,
});

const onMainImageDrop  = (files: File[] | null) => {
    form.value.mainImage = files && files.length > 0 ? files[0] : undefined;
    if (files && files.length) {
        files.forEach((file, index) => {
            if (index === 0) {
                const url = useObjectUrl(file);
                if(url.value) {
                    mainImagePreview.value.push(url.value);
                }
            }
        });
    }
}

const onMainImageChange = (files: FileList | null) => {
    form.value.mainImage = files && files.length > 0 ? files[0] : undefined;
    if (files && files.length) {
        Array.from(files).forEach((file, index) => {
            if (index === 0) {
                const url = useObjectUrl(file);
                if(url.value) {
                    mainImagePreview.value.push(url.value);
                }
            }
        });
    }
}

const onSubImageDrop = (files: File[] | null) => {
    form.value.subImages = files && files.length > 0 ? files : undefined;
    if (files && files.length) {
        files.forEach((file) => {
            const url = useObjectUrl(file);
            if (url.value) {
                subImagesPreviews.value.push(url.value);
            }
        });
    }
}

const onSubImageChange = (files: FileList | null) => {
    form.value.subImages = files && files.length > 0 ? Array.from(files) : undefined;
    if (files && files.length) {
        Array.from(files).forEach((file) => {
            const url = useObjectUrl(file);
            if (url.value) {
                subImagesPreviews.value.push(url.value);
            }
        });
    }
}

const onSubmit = async () => {
    try {
        await displayLoader();
        await productStore.createProduct(form.value);
        onClose();
    } catch (error) {
        console.log(error)
    } finally {
        destroyLoader();
    }
}
</script>

<template>
    <Modal
        :is-open="isModalOpen"
        @on-close="onClose"
        title="Product Modal"
        description="Product modal description"
    >
        <div class="overflow-y-auto h-[500px] max-h-[600px]">
            <form class="grid gap-y-4" action="" @submit.prevent="onSubmit">
                <div class="grid gap-2">
                    <Label for="name">Name</Label>
                    <Input
                        id="name"
                        type="text"
                        placeholder="name"
                        v-model="form.name"
                    />
                </div>
                <div class="grid gap-2">
                    <Label for="price">Price</Label>
                    <Input
                        id="price"
                        type="number"
                        placeholder="price"
                        v-model="form.price"
                    />
                </div>
                <div class="grid gap-2">
                    <Label for="stock">Stock</Label>
                    <Input
                        id="stock"
                        type="number"
                        placeholder="stock"
                        v-model="form.stock"
                    />
                </div>
                <div class="grid gap-2">
                    <Label for="mImage">Main Image</Label>
                    <template v-if="!form.mainImage">
                        <FileUploader
                            :multiple="false"
                            @on-change="onMainImageChange"
                            @on-drop="onMainImageDrop"
                        />
                    </template>
                    <div v-else class="flex gap-x-2">
                        <img v-for="(image, index) in mainImagePreview"
                             :key="index"
                             :src="image"
                             class="h-40 w-auto object-cover border"
                             alt="image"
                        />
                    </div>
                </div>
                <div class="grid gap-2">
                    <Label for="mImage">Sub Images</Label>
                    <template v-if="!form.subImages">
                        <FileUploader
                            :multiple="true"
                            @on-change="onSubImageChange"
                            @on-drop="onSubImageDrop"
                        />
                    </template>
                    <div v-else class="grid grid-cols-2 flex-wrap gap-x-2">
                        <img v-for="(image, index) in subImagesPreviews"
                             :key="index"
                             :src="image"
                             class="h-40 w-auto object-cover border"
                             alt="image"
                        />
                    </div>
                </div>
                <div class="grid gap-2">
                    <Label for="description">Description</Label>
                    <Input
                        id="description"
                        type="text"
                        placeholder="description"
                        v-model="form.description"
                    />
                </div>
                <div class="grid gap-2">
                    <Label for="category">Category</Label>
                    <Select v-model="form.category" id="category">
                        <SelectTrigger>
                            <SelectValue placeholder="category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem v-for="category in categories" :key="category._id" :value="category._id">
                                    {{ category.name }}
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <Button class="w-full" type="submit">Create Product</Button>
            </form>
        </div>
    </Modal>
</template>

<style scoped>

</style>