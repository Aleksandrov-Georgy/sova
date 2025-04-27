<script setup lang="ts">
import type { IProductData } from "@/types/products";

defineProps<{
  products: IProductData[];
}>();
</script>

<template>
  <section class="cards">
    <div v-for="item in products" :key="item.id" class="card">
      <h3>{{ item.name }}</h3>
      <p v-if="item.description">{{ item.description }}</p>
      <p v-if="item.price">Цена: {{ item.price }} ₽</p>
    </div>
  </section>
</template>

<style scoped>
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  width: 100%;
}

.card {
  padding: 20px;
  background: white;
  border-radius: var(--border-radius);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
}
</style>