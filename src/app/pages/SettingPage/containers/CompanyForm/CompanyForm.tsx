import * as React from 'react';
import { Form } from 'antd';

import { Lang, SettingCompany } from 'src/core/api';

import { Info } from 'src/shared/components/Info';
import { Input } from 'src/shared/components/Input';
import { SaveButton } from 'src/shared/components/SaveButton';
import { Spin } from 'src/shared/components/Spin';
import { Upload } from 'src/shared/components/Upload';
import { mutationForm, queryForm } from 'src/shared/graphql';
import { getSettings, SETTING, setUpdateSettings } from 'src/shared/graphql/Setting/schema.gql';
import { convertArrayOfObjectsToObject } from 'src/shared/helpers/convertArrayOfObjects';

import { companyInfo, formInfo } from './constants';

export interface CompanyFormProps extends Lang {}

export function CompanyForm({ lang }: CompanyFormProps) {
    let [form] = Form.useForm();

    let mutation = mutationForm({ formType: 'update', mutations: setUpdateSettings });
    let query = queryForm({ query: getSettings, variables: { category: 'company' } });
    if (mutation.loading || query.loading) return <Spin />;

    let data = convertArrayOfObjectsToObject(query.data?.getSettingsByCategory) as SettingCompany;
    let initialValues = { company_name: data.name, company_year: data.year };

    function handleFinish(values: any) {
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

    return (
        <Form form={form} initialValues={initialValues} layout='vertical' onFinish={handleFinish}>
            <Info
                description={companyInfo.companyInformation.description[lang]}
                title={companyInfo.companyInformation.title[lang]}
            >
                <Form.Item
                    label={formInfo.companyName.label[lang]}
                    name='company_name'
                    rules={[{ required: true, message: formInfo.companyName.message[lang] }]}
                >
                    <Input placeholder='PT. Lisys' />
                </Form.Item>
                <Form.Item
                    extra={formInfo.companyYear.extra[lang]}
                    label={formInfo.companyYear.label[lang]}
                    name='company_year'
                    rules={[{ required: true, message: formInfo.companyYear.message[lang] }]}
                >
                    <Input placeholder='2019' />
                </Form.Item>
            </Info>
            <Info
                description={companyInfo.companyLogo.description[lang]}
                title={companyInfo.companyLogo.title[lang]}
            >
                <Form.Item label={formInfo.companyLogo.label[lang]}>
                    <Upload name='company_logo' listType='picture-card' />
                </Form.Item>
                <Form.Item>
                    <SaveButton />
                </Form.Item>
            </Info>
        </Form>
    );
}
