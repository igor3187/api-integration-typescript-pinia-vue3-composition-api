import { defineStore } from 'pinia'
import axios from '@/plugins/axios'
import type { APIResponse, TCategory, TCategories } from '@/types'

export const useCategoryStore = defineStore('CategoryStore', {
    state: () => ({
        categoriesData: {} as TCategories,
    }),
    getters: {},
    actions: {
        async createCategory(form: Record<string, string>) {
            return new Promise<TCategory>( async (resolve, reject) => {
                try {
                    const { data } = await axios.post<APIResponse<TCategory>>('/ecommerce/categories', { ...form });
                    console.log('CATEGORY', data.data);
                    resolve(data?.data)
                } catch (error) {
                    reject(error)
                }
            });
        },
        async getCategory(page: number, limit: number) {
            return new Promise<TCategories>( async (resolve, reject) => {
                try {
                    const { data } = await axios.get<APIResponse<TCategories>>(`/ecommerce/categories?page=${page}&limit=${limit}`);
                    console.log('CATEGORIES', data.data);
                    data.data?.categories ? this.categoriesData = data.data : {};
                    resolve(data?.data)
                } catch (error) {
                    reject(error)
                }
            });
        },
    },
});