<script setup lang="ts">
import {useRoute, useRouter} from 'vue-router'
import {onMounted, ref} from "vue";
import {API} from "@/services/axios";
import {IProductData} from "@/types/products";
import {toast} from "vue3-toastify";
import {useConfig} from "@/stores/config";
import Card from "@/components/homePage/components/Card.vue";

const route = useRoute();
const router = useRouter();
const config = useConfig();
const cardId = +route.params.id;

const productData = ref<IProductData[]>([])

const getData = async () => {
  try {
    config.setLoading(true);
    const res = await API.getProducts(1000, 1)
    // В https://fakerapi.it/ нет запроса на получение одного продукта по id, по этому пишу так.
    // В первый раз грузим все карты, потом достает нужную из кэша.
    const foundProduct = res.find(el => cardId === el.id)

    productData.value = foundProduct ? [foundProduct] : []
  } catch (err) {
    toast('Ошибка получения данных', {type: 'error'})
  } finally {
    config.setLoading(false);
  }
}

onMounted(() => {
  getData()
})

</script>

<template>
  <section class="card">
    <div class="card__content">
      <el-button @click="router.go(-1)" class="card__button">Назад</el-button>
      <Card :products="productData"/>
    </div>
  </section>
</template>

<style scoped>
.card {
  background-color: var(--root-background-color);
  width: 100%;
  height: 100vh;
}
.card__content {
  padding: 20px;
}

.card__button {
  margin-bottom: 10px;
}
</style>