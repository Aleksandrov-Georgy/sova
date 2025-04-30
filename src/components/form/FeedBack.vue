<script setup lang="ts">
import {computed, reactive, ref} from "vue";
import { useUser } from "@/stores/user";
import { ElNotification } from "element-plus";
import type { IFeedBackForm, FormField } from "@/types/form";
import {validateForm} from "@/components/form/utils/validateForm";
import {formFields} from "@/components/form/formFields";
import {useModalStore} from "@/stores/modal";

const modalConfig = useModalStore()
const { userData } = useUser();

const formData = reactive<IFeedBackForm>({
  email: userData?.email || '',
  phone: null,
  fio: '',
  birthday: null,
  comment: '',
});

const showErrors = ref(false);

const getFieldValue = (field: FormField) => {
  return formData[field.model];
};

const handleSubmit = (e: Event) => {
  e.preventDefault();
  showErrors.value = true;

  if (!validateForm(formData)) {
    return;
  }
  console.log(formData);
  ElNotification({
    title: 'Успешно',
    message: 'Форма отправлена',
    type: 'success',
  });

  modalConfig.closeAllModals()
};
</script>

<template>
  <form class="form" @submit="handleSubmit">
    <h3>Форма обратной связи</h3>
    <div class="form__content">
      <template v-for="field in formFields" :key="field.model">
        <component
            :is="field.component"
            v-if="field.component === 'el-input'"
            v-model="formData[field.model]"
            :type="field.type"
            :placeholder="field.placeholder"
            class="full-width-input"
            :class="{ 'is-error': showErrors && !getFieldValue(field) }"
            :rows="field.rows"
        />
<!--    ошибка связанна с используемой библиотекой и ее типизацией.    */-->
        <el-date-picker
            v-else-if="field.component === 'el-date-picker'"
            v-model="formData.birthday"
            type="date"
            :placeholder="field.placeholder"
            class="full-width-input"
            :class="{ 'is-error': showErrors && !formData.birthday }"
            :value-format="field.valueFormat"
        />
      </template>
    </div>
    <div class="button-container">
      <el-button
          type="primary"
          native-type="submit"
          class="submit-button"
      >
        Отправить
      </el-button>
    </div>
  </form>
</template>

<style scoped>
/* Стили остаются без изменений */
.form {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  padding: 16px;
  height: 100%;
}

.form__content {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  flex-grow: 1;
}

h3 {
  margin: 0 0 8px 0;
  font-size: 1.2rem;
  color: var(--el-text-color-primary);
}

.button-container {
  display: flex;
  justify-content: flex-start;
  margin-top: auto;
  padding-top: 16px;
}

:deep(.full-width-input),
:deep(.full-width-input .el-input__wrapper),
:deep(.full-width-input .el-input__inner) {
  width: 100%;
}

:deep(.el-picker__popper) {
  z-index: 1000002 !important;
}

:deep(.el-date-editor.el-input) {
  width: 100%;
}

:deep(.is-error .el-input__wrapper) {
  box-shadow: 0 0 0 1px var(--el-color-danger) inset;
}

:deep(.is-error .el-textarea__inner) {
  box-shadow: 0 0 0 1px var(--el-color-danger) inset;
}
</style>