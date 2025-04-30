<template>
  <Transition name="fade">
    <div
        v-if="modalStore.isVisibleRightModal"
        class="wrapper"
        @click.self="closeModal"
    >
      <Transition name="slide">
        <div
            v-if="modalStore.isVisibleRightModal"
            class="right-modal"
        >
          <CloseSvg class="right-modal__close-icon" @click="closeModal" />
          <slot/>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import CloseSvg from "@/assets/icon/CloseSVG.vue";
import { useModalStore } from "@/stores/modal";
import { useKeyboard } from "@/utils/composable";

const modalStore = useModalStore();

const closeModal = () => {
  modalStore.closeRightModal();
};

useKeyboard((e: KeyboardEvent) => {
  if (e.key === 'Escape' && modalStore.isVisibleRightModal) {
    closeModal();
  }
});
</script>

<style scoped>
.wrapper {
  width: 100%;
  height: 100%;
  position: fixed;
  inset: 0;
  background: var(--background-modal-window);
  z-index: 10;
}

.right-modal {
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  width: 35%;
  min-width: 300px;
  max-width: 400px;
  background: var(--backround-modal);
  padding: 24px;
  box-shadow: var(--modal-shadow);
  overflow-y: auto;
  z-index: 100;
}

.right-modal__close-icon {
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;
  transition: transform 0.2s;
}

.right-modal__close-icon:hover {
  transform: scale(1.1);
}

/* Анимация фона */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
}

.slide-enter-from {
  transform: translateX(100%);
}

.slide-enter-to {
  transform: translateX(0);
}

.slide-leave-active {
  position: absolute;
}

.slide-leave-to {
  transform: translateX(100%);
}
</style>