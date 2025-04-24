<template>
  <h1>HomeView</h1>

  <button @click="openModal('form')">Форма обратной связи</button>
  <button @click="openRightModal('profile')">Профиль</button>

  <ModalWrapperWrapper>
    <component :is="modals[modalStore.currentModal]"/>
  </ModalWrapperWrapper>

  <RightModalWrapper>
    <component :is="rightModals[modalStore.currentRightModal]"/>
  </RightModalWrapper>
</template>

<script setup>
import ModalWrapperWrapper from "@/components/shared/ModalWrapper.vue";
import RightModalWrapper from "@/components/shared/RightModalWrapper.vue";
import { useModalStore } from "@/stores/modal";
import FeedBack from "@/components/form/FeedBack.vue";
import Profile from "@/components/profile/Profile.vue";

const modalStore = useModalStore();

const modals = {
  form: FeedBack,
};
const rightModals = {
  profile: Profile,
};

const openModal = (modalName) => {
  modalStore.showModal(modalName);
};

const openRightModal = (modalName) => {
  modalStore.showModalRight(modalName);
};
</script>