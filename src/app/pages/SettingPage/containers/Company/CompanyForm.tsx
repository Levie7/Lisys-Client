import * as React from 'react';
import { Form } from 'antd';

import { InfoSetting } from 'src/app/pages/SettingPage/components/InfoSetting';
import { SaveSettingButton } from 'src/app/pages/SettingPage/components/SaveSettingButton';

import { SettingCompany } from 'src/core/api';

import { Input } from 'src/shared/components/Input';
import { Spin } from 'src/shared/components/Spin';
import { Upload } from 'src/shared/components/Upload';
import { mutationForm } from 'src/shared/graphql/mutationForm';
import { getSettings, SETTING, setUpdateSettings } from 'src/shared/graphql/Setting/schema.gql';
import { convertArrayOfObjectsToObject } from 'src/shared/helpers/convertArrayOfObjects';
import { ErrorHandler } from 'src/shared/utilities/errors';
import { Progress } from 'src/shared/utilities/progress';

import { companyInfo } from './constants';

export function CompanyForm() {
    let [form] = Form.useForm();

    let mutation = mutationForm('update', setUpdateSettings);
    let query = handleQuery();
    if (mutation.loading || query.loading) return <Spin />;

    let company = convertArrayOfObjectsToObject(
        query.data?.getSettingsByCategory
    ) as SettingCompany;
    let initialValues = company && { company_name: company.name, company_year: company.year };

    function handleFinish(values: any) {
        Progress(true);

        let { company_name, company_year } = values;

        mutation.action({
            refetchQueries: [{ variables: { category: 'company' }, query: SETTING }],
            variables: {
                payload: [
                    { category: 'company', type: 'name', value: company_name },
                    { category: 'company', type: 'year', value: company_year },
                ],
            },
        });
    }

    function handleQuery() {
        let { data, loading } = getSettings({
            onError(error: any) {
                ErrorHandler(error);
            },
            variables: { category: 'company' },
        });

        return {
            data,
            loading,
        };
    }

    return (
        <Form form={form} initialValues={initialValues} layout='vertical' onFinish={handleFinish}>
            <InfoSetting
                description={companyInfo.companyInformation.description}
                title={companyInfo.companyInformation.title}
            >
                <Form.Item
                    label='Company Name'
                    name='company_name'
                    rules={[{ required: true, message: 'Please input the company name' }]}
                >
                    <Input placeholder='PT. Lisys' />
                </Form.Item>
                <Form.Item
                    extra='Year the company was founded until now'
                    label='Company Year'
                    name='company_year'
                    rules={[{ required: true, message: 'Please input the company year' }]}
                >
                    <Input placeholder='2019' />
                </Form.Item>
            </InfoSetting>
            <InfoSetting
                description={companyInfo.companyLogo.description}
                title={companyInfo.companyLogo.title}
            >
                <Form.Item label='Company Logo'>
                    <Upload name='company_logo' listType='picture-card' />
                </Form.Item>
                <Form.Item>
                    <SaveSettingButton />
                </Form.Item>
            </InfoSetting>
        </Form>
    );
}
