import { defineStore } from 'pinia'

interface IConfigState {
    loading: boolean,
}

export const useConfig = defineStore('config', {
    state: (): IConfigState => ({
        loading: false,
    }),
    actions: {
        setLoading(action: boolean) {
            this.loading = action
        },
    }
})