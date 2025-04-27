<script setup lang="ts">
import type { IProductData } from "@/types/products";
import {useRoute, useRouter} from "vue-router";

defineProps<{
  products: IProductData[];
}>();

const route = useRoute();
const router = useRouter();
const id = route.params.id ? +route.params.id : undefined;

const clickCard = (id: IProductData['id']) => {
  router.push(`/card/${id}`);
}
</script>

<template>
  <section class="cards" :class="{ 'cards--single': id }">
    <div
        @click="clickCard(item.id)"
        v-for="item in products"
        :key="item.id"
        class="card"
        :class="{ 'card--only': id === item.id }"
    >
      <h3>Название: {{ item.name }}</h3>
      <p v-if="item.description">Описание: {{ item.description }}</p>
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
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
  }
}

.cards--single {
  grid-template-columns: 1fr;
  max-width: 600px;
  margin: 0 auto;
}

.card--only {
  padding: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: none;
    cursor: default;
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 15px;
  }

  p {
    font-size: 1.1rem;
    margin-bottom: 10px;
  }
}
</style>