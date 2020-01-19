import { Setting } from 'src/core/api';
import { gql, useMutation, useQuery } from 'src/core/graphql';

export const SETTING = gql`
    query getSettingsByCategory($category: String) {
        getSettingsByCategory(category: $category) {
            type
            value
        }
    }
`;

const UPDATE_SETTING = gql`
    mutation updateSetting($payload: [UpdateSettingPayload]) {
        updateSetting(payload: $payload) {
            category
            type
            value
        }
    }
`;

export const getSettings = (params: any) =>
    useQuery<{ getSettingsByCategory: Setting[] }>(SETTING, params);
export const setUpdateSettings = (onComplete: any) =>
    useMutation<{ updateSetting: Setting }>(UPDATE_SETTING, onComplete);
