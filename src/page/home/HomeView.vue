<template>
  <header class="header">
    <div class="feedback" @click="openRightModal('form')">
      <FeedBackSVG/>
      <span>Обратная связь</span>
    </div>
    <div class="auth-wrapper">
      <UserSVG
          v-if="!userStore.isAuthenticated"
          class="auth-icon"
          @click="openModal('login')"
      />
      <div v-else class="user-info">
        <span class="user-email">{{ userStore.userData?.email || '' }}</span>
        <LogoutSVG class="auth-icon" @click="logout"/>
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
        <component :is="tab.component"/>
      </el-tab-pane>
    </el-tabs>
  </header>

  <ModalWrapper v-if="modalStore.currentModal && modals[modalStore.currentModal as ModalKey]">
    <component :is="modals[modalStore.currentModal as ModalKey]"/>
  </ModalWrapper>

  <RightModalWrapper v-if="modalStore.isVisibleRightModal">
    <component :is="modals[modalStore.currentRightModal as ModalKey]"/>
  </RightModalWrapper>

  <Loader/>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useUser } from '@/stores/user';
import { useModalStore } from '@/stores/modal';
import Home from '@/components/homePage/Home.vue';
import Profile from '@/components/profile/Profile.vue';
import FeedBack from '@/components/form/FeedBack.vue';
import Login from '@/components/shared/modal/Login.vue';
import ModalWrapper from '@/components/shared/ModalWrapper.vue';
import Loader from '@/components/shared/Loader.vue';
import UserSVG from '@/assets/icon/UserSVG.vue';
import LogoutSVG from '@/assets/icon/LogoutSVG.vue';
import FeedBackSVG from "@/assets/icon/FeedBackSVG.vue";
import RightModalWrapper from "@/components/shared/RightModalWrapper.vue";

type ModalKey = 'form' | 'login';
type ModalComponents = typeof FeedBack | typeof Login;

const modalStore = useModalStore();
const userStore = useUser();
const activeTab = ref('home');

const modals: Record<ModalKey, ModalComponents> = {
  form: FeedBack,
  login: Login,
} as const;

const tabs = computed(() => [
  { name: 'home', label: 'Главная', component: Home },
  {
    name: 'profile',
    label: 'Профиль',
    component: Profile,
    disabled: !userStore.isAuthenticated
  }
]);

const openModal = (modalName: ModalKey) => {
  modalStore.showModal(modalName);
};

const openRightModal = (modalName: ModalKey) => {
  modalStore.showModalRight(modalName);
}

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

.feedback {
  position: absolute;
  left: 20px;
  top: 15px;
  cursor: pointer;
  display: flex;
  gap: 10px;
}

.user-info {
  display: flex;
  gap: 10px;
}
</style>