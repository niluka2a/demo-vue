import {defineStore} from 'pinia'
import {ref} from "vue";

export const useGlobalStore = defineStore('global-store', {
    state: () => ({
        loading: ref<boolean>(false),
    }),
})
