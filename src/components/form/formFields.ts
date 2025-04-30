import type {FormField} from "@/types/form";


/**
 * Поля для формы обратной связи
 * */
export const formFields: FormField[] = [
    {
        model: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'Введите ваш email',
        component: 'el-input'
    },
    {
        model: 'fio',
        label: 'ФИО',
        type: 'text',
        placeholder: 'Введите ваше ФИО',
        component: 'el-input'
    },
    {
        model: 'phone',
        label: 'Телефон',
        type: 'tel',
        placeholder: 'Введите ваш телефон',
        component: 'el-input'
    },
    {
        model: 'birthday',
        label: 'Дата рождения',
        type: 'date',
        placeholder: 'Выберите дату рождения',
        component: 'el-date-picker',
        valueFormat: 'YYYY-MM-DD'
    },
    {
        model: 'comment',
        label: 'Комментарий',
        type: 'textarea',
        placeholder: 'Введите ваш комментарий',
        component: 'el-input',
        rows: 6
    }
];
