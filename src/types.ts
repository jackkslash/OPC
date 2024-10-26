export type FieldType = 'text' | 'textarea' | 'checkbox';

export interface FormField {
    id: string;
    label: string;
    type: FieldType;
    placeholder?: string;
}

export interface FormInfo {
    title: string;
    triggerLabel: string;
    submitLabel: string;
    formFields: FormField[];
}