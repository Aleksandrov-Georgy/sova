export interface IFeedBackForm {
    email: string;
    phone: string | null;
    fio: string;
    birthday: Date | null;
    comment: string;
}

export type FormField = {
    model: keyof IFeedBackForm;
    label: string;
    type: string;
    placeholder: string;
    component: 'el-input' | 'el-date-picker';
    rows?: number;
    valueFormat?: string;
};