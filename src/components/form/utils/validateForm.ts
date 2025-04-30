import { ElNotification } from "element-plus";

interface IFormData {
    email: string;
    phone: string | null;
    fio: string;
    birthday: Date | null;
    comment: string;
}

/**
 * Функция проводит валидацию формы
 * @param formData - форма для отправки
 * @param showNotifications - показывать ли уведомления (если нужно будет масштабировать)
 * @return Boolean - прошла проверка или нет
 * */
export const validateForm = (formData: IFormData, showNotifications = true): boolean => {
    let isValid = true;

    if (!formData.email) {
        isValid = false;
        if (showNotifications) {
            ElNotification({
                title: 'Ошибка',
                message: 'Поле Email обязательно для заполнения',
                type: 'error',
            });
        }
    }

    if (!formData.fio) {
        isValid = false;
        if (showNotifications) {
            ElNotification({
                title: 'Ошибка',
                message: 'Поле ФИО обязательно для заполнения',
                type: 'error',
            });
        }
    }

    if (!formData.phone) {
        isValid = false;
        if (showNotifications) {
            ElNotification({
                title: 'Ошибка',
                message: 'Поле Телефон обязательно для заполнения',
                type: 'error',
            });
        }
    }

    if (!formData.birthday) {
        isValid = false;
        if (showNotifications) {
            ElNotification({
                title: 'Ошибка',
                message: 'Поле Дата рождения обязательно для заполнения',
                type: 'error',
            });
        }
    }

    if (!formData.comment) {
        isValid = false;
        if (showNotifications) {
            ElNotification({
                title: 'Ошибка',
                message: 'Поле Комментарий обязательно для заполнения',
                type: 'error',
            });
        }
    }

    return isValid;
};