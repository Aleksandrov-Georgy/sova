<template>
  <div class="page-container">
    <div class="content-wrapper">
      <div class="content">
        <Card v-if="productsData?.length > 0" :products="productsData" />
        <div v-else-if="!config.loading" class="empty-state">
          Нет данных
        </div>
      </div>
    </div>

    <footer class="pagination-footer">
      <el-pagination
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          :current-page="currentPage"
          layout="sizes, prev, pager, next, total"
          :total="totalItems"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
      />
    </footer>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import Card from "@/components/homePage/components/Card.vue";
import { API } from "@/services/axios";
import { toast } from "vue3-toastify";
import { useConfig } from "@/stores/config";
import {IProductData} from "@/types/products";
import {scrollToTop} from "@/utils/scrollTop";

const config = useConfig();

const productsData = ref<IProductData[]>([])

const pageSize = ref(20);
const currentPage = ref(1);
const totalItems = ref(1000);

const handleSizeChange = (val: number) => {
  pageSize.value = val;
  scrollToTop()
};

const handleCurrentChange = (val: number) => {
  currentPage.value = val;
  scrollToTop()
};

const getProducts = async () => {
  try {
    config.setLoading(true);
    productsData.value = await API.getProducts(pageSize.value, currentPage.value);
  } catch (err) {
    toast('Ошибка при загрузке данных', { type: 'error' });
  } finally {
    config.setLoading(false);
  }
};

watch([pageSize, currentPage], () => {
  getProducts();
}, { immediate: false });

onMounted(() => {
  getProducts();
});
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 90vh;
  width: 90vw;
}

.content-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 100%;
}

.content {
  flex: 1;
  width: 100%;
}

.pagination-footer {
  background: transparent;
  padding: 16px;
  border-top: 1px solid var(--el-border-color-light);
  display: flex;
  justify-content: center;
}
</style>