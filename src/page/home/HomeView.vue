<template>
  <header class="header">
    <div class="auth-wrapper">
      <UserSVG
          v-if="!userStore.userData?.email"
          class="auth-icon"
          @click="openModal('login')"
      />
      <div v-else class="user-info">
        <span class="user-email">{{ userStore.userData.email }}</span>
        <LogoutSVG class="auth-icon" @click="logout" />
      </div>
    </div>

    <el-tabs v-model="activeTab" class="tabs">
      <el-tab-pane
          v-for="tab in tabs"
          :key="tab.name"
          :label="tab.label"
          :name="tab.name"
          :disabled="tab.disabled"
      >
        <component :is="tab.component" />
      </el-tab-pane>
    </el-tabs>
  </header>

  <ModalWrapper>
    <component :is="modals[modalStore.currentModal]"/>
  </ModalWrapper>

  <Loader/>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import {useUser} from '@/stores/user';
import { useModalStore } from '@/stores/modal';
import Home from '@/components/homePage/Home.vue';
import Profile from '@/components/profile/Profile.vue';
import FeedBack from '@/components/form/FeedBack.vue';
import Login from '@/components/shared/modal/Login.vue';
import ModalWrapper from '@/components/shared/ModalWrapper.vue';
import Loader from '@/components/shared/Loader.vue';
import UserSVG from '@/assets/icon/UserSVG.vue';
import LogoutSVG from '@/assets/icon/LogoutSVG.vue';

const modalStore = useModalStore();
const userStore = useUser();
const activeTab = ref('home');

const modals = {
  form: FeedBack,
  login: Login,
};

const tabs = computed(() => [
  { name: 'home', label: 'Главная', component: Home },
  {
    name: 'profile',
    label: 'Профиль',
    component: Profile,
    disabled: !userStore.isAuthenticated
  }
]);

const openModal = (modalName: 'form' | 'login') => {
  modalStore.showModal(modalName);
};

const logout = () => {
  userStore.clearUser();
  if (activeTab.value === 'profile') {
    activeTab.value = 'home';
  }
};
</script>

<style scoped>
.tabs {
  display: flex;
 align-items: center;
}

.auth-wrapper {
  position: absolute;
  right: 20px;
  top: 15px;
  cursor: pointer;
}

.user-info {
  display: flex;
  gap: 10px;
}
</style>