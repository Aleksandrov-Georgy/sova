<script setup lang="ts">
import {ref} from 'vue';
import {toast} from "vue3-toastify";
import {useUser} from "@/stores/user";
import {useModalStore} from "@/stores/modal";
import {useConfig} from "@/stores/config";

const userStore = useUser();
const modalStore = useModalStore();
const loading = useConfig();

interface LoginForm {
  email: string;
  password: string;
}

const formData = ref<LoginForm>({
  email: '',
  password: ''
});

const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const handleSubmit = async () => {
  try {
    loading.setLoading(true);

    const {email, password} = formData.value;

    if (!email.trim()) {
      toast('Введите email', {type: 'error'});
      return;
    }

    if (!validateEmail(email)) {
      toast('Введите корректный email', {type: 'error'});
      return;
    }

    if (!password.trim()) {
      toast('Введите пароль', {type: 'error'});
      return;
    }

    if (password.length < 6) {
      toast('Пароль должен содержать минимум 6 символов', {type: 'error'});
      return;
    }

    userStore.setUser({email, password});

    toast('Авторизация прошла успешно', {type: 'success'});
    modalStore.closeAllModals();

  } catch (error) {
    console.log(error);
    toast('Произошла ошибка при авторизации', {type: 'error'});
  } finally {
    loading.setLoading(false);
  }
};
</script>

<template>
  <form class="form" @submit.prevent="handleSubmit">
    <h3 class="form__title">Авторизация</h3>

    <el-input
        v-model="formData.email"
        type="text"
        placeholder="Email"
        clearable
    />

    <el-input
        v-model="formData.password"
        type="password"
        placeholder="Пароль"
        show-password
    />

    <el-button
        type="primary"
        native-type="submit"
    >
      Войти
    </el-button>
  </form>
</template>

<style scoped>
.form {
  width: 280px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form__title {
  text-align: center;
  color: var(--text-gray);
}

</style>