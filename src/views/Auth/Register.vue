<script setup lang='ts'>
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card'

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/stores/authStore'

type PAYLOAD = {
    email: string,
    password: string,
    username: string,
    role: 'ADMIN'|'USER',
}

const router = useRouter();
const store = useAuthStore();
const form = ref<PAYLOAD>({
    password: 'password',
    username: 'ilevit',
    email: 'ilevit@gmail.com',
    role: 'ADMIN',
});

const onSubmit = async () => {
    try {
        await store.registerUser(form.value)
        await router.push('/')
    } catch (error) {
        console.log(error)
    } finally {
        console.log('')
    }
}
</script>

<template>
    <div class="flex flex-col justify-center items-center min-h-screen">
        <div class="mx-auto w-full max-w-md">
            <form @submit.prevent="onSubmit">
                <Card class="overflow-y-auto">
                    <CardHeader class="space-y-1">
                        <CardTitle class="text-2xl">Create an account</CardTitle>
                        <CardDescription>Enter your details below to create an account</CardDescription>
                    </CardHeader>
                    <CardContent class="grid gap-4">
                        <div class="grid gap-2">
                            <Label for="username">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="email"
                              v-model="form.email"
                            />
                        </div>
                        <div class="grid gap-2">
                            <Label for="username">Username</Label>
                            <Input
                              id="username"
                              type="text"
                              placeholder="username"
                              v-model="form.username"
                            />
                        </div>
                        <div class="grid gap-2">
                            <Label for="password">Password</Label>
                            <Input
                              id="password"
                              type="password"
                              placeholder="password"
                              v-model="form.password"
                            />
                        </div>
                        <div class="grid gap-1">
                            <Label for="role">Role</Label>
                            <Select v-model="form.role" id="role">
                                <SelectTrigger>
                                    <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="USER">USER</SelectItem>
                                        <SelectItem value="ADMIN">ADMIN</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                    <CardFooter class="flex-col space-y-2">
                        <Button class="w-full" type="submit">Register</Button>
                        <p>
                            Already have an account?
                            <RouterLink
                                to="/auth/login"
                                class="border-b border-gray-500 text-muted-foreground hover:text-primary"
                            >
                                Login
                            </RouterLink>
                        </p>
                        <Button>Deploy</Button>
                    </CardFooter>
                </Card>
            </form>
        </div>
    </div>
</template>