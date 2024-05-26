import {defineStore} from 'pinia'
import type {Course, LoginInput, User} from "@/interface";
import {config} from '@/config'
import {useGlobalStore} from "@/stores/global";

const headers: HeadersInit = config.headers
headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'))

export const useCourseStore = defineStore('course-store', {
    state: () => ({
        courses: [] as Course[]
    }),

    actions: {
        /**
         * Fetch courses.
         */
        async fetchCourses() {
            const globalStore = useGlobalStore()

            globalStore.loading = true

            const url: string = `${import.meta.env.VITE_VUE_APP_ROOT_API}/api/courses`;

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
                    this.courses = response.data
                })
                .finally(() => {
                    globalStore.loading = false
                })
        },
    }
})
