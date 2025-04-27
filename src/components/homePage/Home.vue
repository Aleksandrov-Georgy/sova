<template>
  <div class="page-container">
    <div class="content-wrapper">
      <div class="content">
        <h1>HOME</h1>
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
import { API } from "@/services/axios";
import { toast } from "vue3-toastify";
import { useConfig } from "@/stores/config";
import type { ComponentSize } from "element-plus";

const config = useConfig();
const size = ref<ComponentSize>('default');
const pageSize = ref(20);
const currentPage = ref(1);
const totalItems = ref(1000);

const handleSizeChange = (val: number) => {
  pageSize.value = val;
};

const handleCurrentChange = (val: number) => {
  currentPage.value = val;
};

const getProducts = async () => {
  try {
    config.setLoading(true);
    const response = await API.getProducts(pageSize.value, currentPage.value);
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
  width: 100%;
}

.content-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.content {
  flex: 1;
}

.pagination-footer {
  padding: 16px;
  background: var(--el-bg-color-page);
  border-top: 1px solid var(--el-border-color-light);
  display: flex;
  justify-content: center;
}
</style>