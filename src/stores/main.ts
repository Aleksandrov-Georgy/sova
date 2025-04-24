import { defineStore } from 'pinia'

interface IConfigState {
    loading: boolean,
    showModal: boolean,
}

export const useConfig = defineStore('config', {
    state: (): IConfigState => ({
        loading: false,
        showModal: false,
    }),
    actions: {
        setLoading(action: boolean) {
            this.loading = action
        },
        setShowModal(show: boolean) {
            this.showModal = show
        }
    }
})