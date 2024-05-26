import {defineStore} from 'pinia'
import type {User} from "@/interface";
import {config} from '@/config'
import {ref} from "vue";
import {useGlobalStore} from "@/stores/global";

const headers: HeadersInit = config.headers
headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'))

export const useUserStore = defineStore('user-store', {
    state: () => ({
        user: {} as User,
        userViewModal: ref<boolean>(false),
        viewUser: {} as User
    }),

    actions: {
        /**
         * Fetch user data.
         */
        async fetchUser() {
            const globalStore = useGlobalStore()

            globalStore.loading = true
            const user: User = JSON.parse(localStorage.getItem('user'))

            const url: string = `${import.meta.env.VITE_VUE_APP_ROOT_API}/api/users/${user.id}`;

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
                    this.user = response.data
                })
                .finally(() => {
                    globalStore.loading = false
                })
        },

        /**
         * Fetch student data.
         */
        async fetchStudent(student: User) {
            if (!student) {
                return
            }

            const globalStore = useGlobalStore()

            const url: string = `${import.meta.env.VITE_VUE_APP_ROOT_API}/api/users/${student.id}`;

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
                    this.viewUser = response.data
                })
                .finally(() => {
                    globalStore.loading = false
                })
        },
    }
})
