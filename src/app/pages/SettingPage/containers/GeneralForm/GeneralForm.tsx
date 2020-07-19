import * as React from 'react';
import { Form } from 'antd';

import { Lang, SettingGeneral } from 'src/core/api';

import { Info } from 'src/shared/components/Info';
import { SaveButton } from 'src/shared/components/SaveButton/SaveButton';
import { Select } from 'src/shared/components/Select';
import { Spin } from 'src/shared/components/Spin';
import { mutationForm, queryForm } from 'src/shared/graphql';
import { getSettings, SETTING, setUpdateSettings } from 'src/shared/graphql/Setting/schema.gql';
import { convertArrayOfObjectsToObject } from 'src/shared/helpers/convertArrayOfObjects';

import { formInfo, generalInfo } from './constants';

export interface GeneralFormProps extends Lang {}

export function GeneralForm({ lang }: GeneralFormProps) {
    let [form] = Form.useForm();

    let mutation = mutationForm({ formType: 'update', mutations: setUpdateSettings });
    let query = queryForm({ query: getSettings, variables: { category: 'general' } });
    if (mutation.loading || query.loading) return <Spin />;

    let data = convertArrayOfObjectsToObject(query.data?.getSettingsByCategory) as SettingGeneral;
    let initialValues = data && {
        date_format: data.date_format,
        time_format: data.time_format,
        language: data.language,
    };

    function onHandleFinish(values: any) {
        let { date_format, time_format, language } = values;

        mutation.action({
            refetchQueries: [{ variables: { category: 'general' }, query: SETTING }],
            variables: {
                payload: [
                    { category: 'general', type: 'date_format', value: date_format },
                    { category: 'general', type: 'time_format', value: time_format },
                    { category: 'general', type: 'language', value: language },
                ],
            },
        });
    }

    return (
        <Form form={form} initialValues={initialValues} layout='vertical' onFinish={onHandleFinish}>
            <Info
                description={generalInfo.dateTime.description[lang]}
                title={generalInfo.dateTime.title[lang]}
            >
                <Form.Item label={formInfo.date.label[lang]} name='date_format'>
                    <Select>
                        <Select.Option value='D-M-YYYY'>1-1-2020</Select.Option>
                        <Select.Option value='DD-MM-YYYY'>01-01-2020</Select.Option>
                        <Select.Option value='D MMM YYYY'>1 Jan 2020</Select.Option>
                        <Select.Option value='DD MMM YYYY'>01 Jan 2020</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label={formInfo.time.label[lang]} name='time_format'>
                    <Select>
                        <Select.Option value='HH:mm'>08:00</Select.Option>
                        <Select.Option value='hh:mm A'>08:00 AM</Select.Option>
                        <Select.Option value='HH:mm:ss'>20:00:00</Select.Option>
                        <Select.Option value='hh:mm:ss A'>08:00:00 AM</Select.Option>
                    </Select>
                </Form.Item>
            </Info>
            <Info
                description={generalInfo.language.description[lang]}
                title={generalInfo.language.title[lang]}
            >
                <Form.Item label={generalInfo.language.title[lang]} name='language'>
                    <Select>
                        <Select.Option value='English'>English</Select.Option>
                        <Select.Option value='Indonesia'>Indonesia</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <SaveButton lang={lang} />
                </Form.Item>
            </Info>
        </Form>
    );
}
