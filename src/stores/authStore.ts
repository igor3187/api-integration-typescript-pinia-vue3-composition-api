import { defineStore } from 'pinia'
import axios from '@/plugins/axios'
import type { APIResponse, TUser } from '@/types'
import { getLocalStorageData } from '@/lib/utils'

export const useAuthStore = defineStore('AuthStore', {
    state: () => ({
        user: null as TUser | null,
    }),
    getters: {
        isAuthenticated: (state) => !!state.user,
    },
    actions: {
        async initializeUser() {
            console.log('Initializing user...');
            this.user = await getLocalStorageData<TUser | null>('currentUserContent', true);
            console.log('User initialized:', this.user);
        },
        async registerUser(form: Record<string, string>): Promise<TUser> {
            try {
                const { data } = await axios.post<APIResponse<{ user: TUser }>>('/users/register', form);
                console.log('REGISTER', data.data);
                return data.data?.user;
            } catch (error) {
                console.error('Register error', error);
                throw error;
            }
        },
        async loginUser(form: Record<string, string>): Promise<TUser> {
            try {
                const { data } = await axios.post<APIResponse<{ user: TUser, accessToken: string, refreshToken: string }>>('/users/login', form);
                console.log('LOGIN', data);
                localStorage.setItem('currentUserContent', JSON.stringify(data.data?.user));
                localStorage.setItem('currentAuthToken', JSON.stringify({
                    accessToken: data.data?.accessToken,
                    refreshToken: data.data?.refreshToken,
                }));
                console.log('data.data?.user', data.data?.user);
                this.user = data.data?.user;
                return data.data?.user;
            } catch (error) {
                console.error('Login error', error);
                throw error;
            }
        },
        logout() {
            this.user = null;
            localStorage.removeItem('currentUserContent');
            localStorage.removeItem('currentAuthToken');
        }
    },
});