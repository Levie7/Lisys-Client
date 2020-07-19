export interface Lang {
    lang: SettingLanguage;
}

export interface Setting {
    category: string;
    type: string;
    value: string;
}

export interface SettingCompany {
    name: string;
    year: string;
}

export interface SettingGeneral {
    date_format: string;
    language: string;
    time_format: string;
}

export interface SupportedLang {
    en: string;
    id: string;
}

export type SettingLanguage = 'en' | 'id';
