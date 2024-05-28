<script setup lang='ts'>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCategoryStore } from '@/stores/categoryStore'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useGlobalLoader } from 'vue-global-loader'

const { displayLoader, destroyLoader } = useGlobalLoader();

type PAYLOAD = {
    name: string,
}

const form = ref<PAYLOAD>({
    name: 'Category 1'
});

const router = useRouter();
const store = useCategoryStore();

const onSubmit = async () => {
    try {
        await displayLoader();
        await store.createCategory(form.value);
        await router.push('/');
    } catch (error) {
        console.log(error)
    } finally {
        destroyLoader();
    }
}

const fetchCategories = async () => {
    try {
        await displayLoader();
        await store.getCategory(1, 2);
    } catch (error) {
        console.log(error)
    } finally {
        destroyLoader();
    }
}

onMounted(async () => await fetchCategories());
</script>

<template>
    <div class="flex flex-col justify-center items-center min-h-screen">
        <div class="mx-auto w-full max-w-md">
            <form @submit.prevent="onSubmit">
                <Card class="overflow-y-auto pt-4">
                    <CardContent class="grid gap-4">
                        <div class="grid gap-2">
                            <Label for="username">Name</Label>
                            <Input
                                id="username"
                                type="text"
                                placeholder="username"
                                v-model="form.name"
                            />
                        </div>
                    </CardContent>
                    <CardFooter class="flex-col space-y-2">
                        <Button class="w-full" type="submit">Create</Button>
                    </CardFooter>
                </Card>
            </form>
        </div>
    </div>
</template>