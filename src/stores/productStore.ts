import { defineStore } from 'pinia'
import axios from '@/plugins/axios'
import type { APIResponse, TCategories, TProduct, TProducts } from '@/types'
import { handleSuccess, handleError } from '@/lib/utils'

export const useProductStore = defineStore('ProductStore', {
    state: () => ({
        productsData: {} as TProducts,
    }),
    getters: {},
    actions: {
        async createProduct(form: Record<string, any>) {
            return new Promise<TProduct>( async (resolve, reject) => {
                try {
                    const formData = new FormData();
                    formData.append('name', form.name);
                    formData.append('price', form.price);
                    formData.append('stock', form.stock);
                    formData.append('mainImage', form.mainImage);
                    formData.append('description', form.description);
                    formData.append('category', form.category);

                    for(let i = 0; i < form.subImages.length; i++) {
                        formData.append('subImages', form.subImages[i]);
                    }

                    const { data } = await axios.post<APIResponse<TProduct>>('/ecommerce/products', formData);
                    console.log('PRODUCTS', data.data);
                    handleSuccess(data.statusCode.toString(), data.message);
                    resolve(data?.data)
                } catch (error) {
                    handleError(error);
                    reject(error)
                }
            });
        },
        async getProducts(page: number, limit: number) {
            return new Promise<TProducts>( async (resolve, reject) => {
                try {
                    const { data } = await axios.get<APIResponse<TProducts>>(`/ecommerce/products?page=${page}&limit=${limit}`);
                    console.log('PRODUCTS', data.data);
                    this.productsData = data.data;
                    resolve(data?.data)
                } catch (error) {
                    handleError(error);
                    reject(error)
                }
            });
        },
        async getProduct(productId: string) {
            return new Promise<TProduct>( async (resolve, reject) => {
                try {
                    const { data } = await axios.get<APIResponse<TProduct>>(`/ecommerce/products/${productId}`);
                    console.log('PRODUCTS', data.data);
                    resolve(data?.data)
                } catch (error) {
                    handleError(error);
                    reject(error)
                }
            });
        },
        async editProduct(productId: string, form: Record<string, any>) {
            return new Promise<TProduct>( async (resolve, reject) => {
                try {
                    const formData = new FormData();
                    formData.append('name', form.name);
                    formData.append('price', form.price);
                    formData.append('stock', form.stock);
                    formData.append('description', form.description);
                    formData.append('category', form.category);

                    if(form.mainImage) {
                        formData.append('mainImage', form.mainImage);
                    }

                    if(form.subImage) {
                        for(let i = 0; i < form.subImages.length; i++) {
                            formData.append('subImages', form.subImages[i]);
                        }
                    }

                    const { data } = await axios.patch<APIResponse<TProduct>>(`/ecommerce/products/${productId}`, formData);
                    console.log('EDIT PRODUCTS', data.data);
                    await this.getProducts(1, 2);
                    handleSuccess(data.statusCode.toString(), data.message);
                    resolve(data?.data)
                } catch (error) {
                    handleError(error);
                    reject(error);
                }
            });
        },
        async deleteProduct(productId: string) {
            return new Promise( async (resolve, reject) => {
                try {
                    const { data } = await axios.delete(`/ecommerce/products/${productId}`);
                    console.log('EDIT PRODUCT', data.data);
                    await this.getProducts(1, 2);
                    handleSuccess(data.statusCode.toString(), data.message);
                    resolve(data?.data)
                } catch (error) {
                    handleError(error);
                    reject(error);
                }
            });
        },
    },
});