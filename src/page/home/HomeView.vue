<template>
  <el-tabs class="tabs" v-model="initialTab" @tab-click="handleTabClick">
    <el-tab-pane
        v-for="tab in tabs"
        :key="tab.name"
        :label="tab.label"
        :name="tab.name"
    >
      <component :is="tab.component" />
    </el-tab-pane>
  </el-tabs>

  <ModalWrapper>
    <component :is="modals[modalStore.currentModal]"/>
  </ModalWrapper>
  <Loader/>
</template>

<script setup>
import { ref } from 'vue';

import Home from '@/components/homePage/Home.vue'
import Profile from '@/components/profile/Profile.vue';
import Loader from "@/components/shared/Loader.vue";
import {useModalStore} from "@/stores/modal.js";
import FeedBack from "@/components/form/FeedBack.vue";
import ModalWrapper from "@/components/shared/ModalWrapper.vue";

const modalStore = useModalStore();
const initialTab = ref('home');

const modals = {
  form: FeedBack,
  profile: Profile,
};

const tabs = [
  { name: 'home', label: 'Главная', component: Home },
  { name: 'profile', label: 'Профиль', component: Profile },
];

</script>

<style scoped>
.tabs {
  display: flex;
  align-items: center;
}
</style>