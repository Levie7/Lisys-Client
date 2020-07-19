import { SettingLanguage } from 'src/core/api';

export function getLanguage(): SettingLanguage {
    return localStorage.getItem('language') === 'English' ? 'en' : 'id';
}
