<script setup lang="ts">
import {useConfig} from "@/stores/config";

const config = useConfig(); // false
</script>

<template>
  <div class="wrapper" v-if="config.loading">
    <div class="loader">
      <div class="loader-circle"></div>
      <div class="loader-circle"></div>
      <div class="loader-circle"></div>
      <div class="loader-circle"></div>
    </div>
  </div>
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
  z-index: 9999;
}

.loader {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.loader-circle {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #3498db;
  animation: loader-bounce 1.4s infinite ease-in-out both;
}

.loader-circle:nth-child(1) {
  animation-delay: -0.32s;
}

.loader-circle:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes loader-bounce {
  0%, 80%, 100% {
    transform: scale(0);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>