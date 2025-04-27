<script setup lang="ts">
</script>

<template>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<style scoped>
  .container {
    width: 100%;
    height: 100%;
    background-color: var(--root-background-color);
    color: var(--root-text-color);
    font-weight: var(--root-font-weight);
  }
</style>
