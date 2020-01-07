import { Setting } from 'src/core/api';
import { gql, useMutation, useQuery } from 'src/core/graphql';

export const COMPANIES = gql`
    {
        getSettingsByCategory(category: "company") {
            type
            value
        }
    }
`;

const UPDATE_SETTING = gql`
    mutation updateSetting($payload: [updateSettingPayload]) {
        updateSetting(payload: $payload) {
            category
            type
            value
        }
    }
`;

export const useCompany = () => useQuery<{ getSettingsByCategory: Setting[] }>(COMPANIES);
export const useUpdateCompany = (onComplete: any) =>
    useMutation<{ updateSetting: Setting }>(UPDATE_SETTING, onComplete);
