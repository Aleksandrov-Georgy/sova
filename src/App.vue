<script setup lang="ts">
</script>

<template>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<style scoped>
  .container {
    width: 100vw;
    height: 100vh;
    background-color: var(--root-background-color);
    color: var(--root-text-color);
    font-weight: var(--root-font-weight);
  }
</style>
