import { defineStore } from 'pinia'

interface ModalState {
    isVisibleModal: boolean;
    isVisibleRightModal: boolean;
    currentModal: string | null;
    currentRightModal: string | null;
}

export const useModalStore = defineStore('modal', {
    state: (): ModalState => ({
        isVisibleModal: false,
        isVisibleRightModal: false,
        currentModal: null,
        currentRightModal: null,
    }),
    actions: {
        showModal(modalName: string | null = null): void {
            this.isVisibleModal = true;
            this.currentModal = modalName;
        },
        showModalRight(modalName: string | null = null): void {
            this.isVisibleRightModal = true;
            this.currentRightModal = modalName;
        },
        closeAllModals(): void {
            this.isVisibleModal = false;
            this.isVisibleRightModal = false;
            this.currentModal = null;
            this.currentRightModal = null;
        },
        closeRightModal(): void {
            this.isVisibleRightModal = false;
            this.currentRightModal = null;
        }
    }
})