<script setup lang="ts">
import CloseSvg from "@/assets/icon/CloseSVG.vue";
import { useModalStore } from "@/stores/modal";
import {useKeyboard} from "@/utils/composable";

const modalStore = useModalStore();

const closeModal = () => {
  modalStore.closeAllModals();
};

useKeyboard((e: KeyboardEvent) => {
  if (e.key === 'Escape' && modalStore.isVisibleModal) {
    closeModal();
  }
});
</script>

<template>
  <Transition name="fade">
    <div v-if="modalStore.isVisibleModal" class="wrapper" @click.self="closeModal">
      <div class="modal">
        <CloseSvg class="modal__close-icon" @click="closeModal"/>
        <slot/>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--background-modal-window);
  position: fixed;
  inset: 0;
  z-index: 1000000;
  overflow: hidden;
}

.modal {
  padding: 24px;
  background: var(--backround-modal);
  border-radius: 24px;
  min-height: 250px;
  min-width: 200px;
  position: relative;
  box-shadow: var(--modal-shadow)
}

.modal__close-icon {
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.5, 1);
}

.slide-enter-from {
  opacity: 0;
  transform: translateY(-100px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateY(50px);
}
</style>