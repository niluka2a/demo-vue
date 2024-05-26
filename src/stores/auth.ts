import {defineStore} from 'pinia'
import type {LoginInput, User} from "@/interface";
import {config} from '@/config'
import {ref} from "vue";
import {useGlobalStore} from "@/stores/global";
import router from "@/router";

const headers: HeadersInit = config.headers

export const useAuthStore = defineStore('auth-store', {
    state: () => ({
        errorMessage: ref<null | string>(null),
        isLoggedIn: ref<boolean>(true),
        token: null as string,
        user: {} as User
    }),

    actions: {
        /**
         * Fetch app setting.
         */
        async login(data: LoginInput) {
            const globalStore = useGlobalStore()

            globalStore.loading = true
            this.isLoggedIn = false

            localStorage.removeItem('user')
            localStorage.removeItem('token')

            const url: string = import.meta.env.VITE_VUE_APP_ROOT_API + '/api/auth/login';

            fetch(url, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(data)
            })
                .then(async (response) => {
                    if (response.status === 500) {
                        throw new Error('')
                    }

                    return response.json()
                })
                .then(async (response) => {
                    if (response.error) {
                        this.errorMessage = response.error
                    } else {
                        this.user = response.user
                        this.token = response.token
                        this.isLoggedIn = true

                        localStorage.setItem('user', JSON.stringify(this.user))
                        localStorage.setItem('token', this.token)
                        
                        await router.push({'name': 'profile'})
                    }
                })
                .finally(() => {
                    globalStore.loading = false
                })
        },

        /**
         * Fetch app setting.
         */
        async logout() {
            const globalStore = useGlobalStore()

            globalStore.loading = true

            const url: string = import.meta.env.VITE_VUE_APP_ROOT_API + '/api/auth/logout';
            headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'))

            fetch(url, {
                method: "POST",
                headers: headers,
                body: JSON.stringify({})
            })
                .then(async (response) => {
                    if (response.status === 500) {
                        throw new Error('')
                    }

                    return response.json()
                })
                .then(async (response) => {
                    this.isLoggedIn = false

                    localStorage.removeItem('user')
                    localStorage.removeItem('token')

                    await router.push({'name': 'login'})
                })
                .finally(() => {
                    globalStore.loading = false
                })
        },

        /**
         * Verify personal access token.
         */
        async verifyToken() {
            if (!localStorage.getItem('token')) {
                this.isLoggedIn = false

                return
            }

            const url: string = import.meta.env.VITE_VUE_APP_ROOT_API + '/api/validate-personal-token';
            headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'))

            fetch(url, {
                method: "GET",
                headers: headers,
            })
                .then(async (response) => {
                    if (response.status === 500) {
                        throw new Error('')
                    }

                    return response.json()
                })
                .then(async (response) => {
                    if (response.status === 401) {
                        this.isLoggedIn = false
                    }

                    this.isLoggedIn = true
                })
                .finally(() => {
                    //
                })
        }
    }
})
