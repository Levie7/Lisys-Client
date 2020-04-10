import * as React from 'react';
import { Form } from 'antd';

import { SettingGeneral } from 'src/core/api';

import { Info } from 'src/shared/components/Info';
import { SaveButton } from 'src/shared/components/SaveButton/SaveButton';
import { Select } from 'src/shared/components/Select';
import { Spin } from 'src/shared/components/Spin';
import { mutationForm } from 'src/shared/graphql/mutationForm';
import { getSettings, SETTING, setUpdateSettings } from 'src/shared/graphql/Setting/schema.gql';
import { convertArrayOfObjectsToObject } from 'src/shared/helpers/convertArrayOfObjects';
import { ErrorHandler } from 'src/shared/utilities/errors';
import { Progress } from 'src/shared/utilities/progress';

import { generalInfo } from './constants';

export function GeneralForm() {
    let [form] = Form.useForm();

    let mutation = mutationForm('update', setUpdateSettings);
    let query = handleQuery();
    if (mutation.loading || query.loading) return <Spin />;

    let general = convertArrayOfObjectsToObject(
        query.data?.getSettingsByCategory
    ) as SettingGeneral;
    let initialValues = general && {
        date_format: general.date_format,
        time_format: general.time_format,
        language: general.language,
    };

    function handleFinish(values: any) {
        Progress(true);

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

    function handleQuery() {
        let { data, loading } = getSettings({
            onError(error: any) {
                ErrorHandler(error);
            },
            variables: { category: 'general' },
        });

        return {
            data,
            loading,
        };
    }

    return (
        <Form form={form} initialValues={initialValues} layout='vertical' onFinish={handleFinish}>
            <Info description={generalInfo.dateTime.description} title={generalInfo.dateTime.title}>
                <Form.Item label='Date Format' name='date_format'>
                    <Select>
                        <Select.Option value='D-M-YYYY'>1-1-2020</Select.Option>
                        <Select.Option value='DD-MM-YYYY'>01-01-2020</Select.Option>
                        <Select.Option value='D MMM YYYY'>1 Jan 2020</Select.Option>
                        <Select.Option value='DD MMM YYYY'>01 Jan 2020</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label='Time Format' name='time_format'>
                    <Select>
                        <Select.Option value='HH:mm'>08:00</Select.Option>
                        <Select.Option value='hh:mm A'>08:00 AM</Select.Option>
                        <Select.Option value='HH:mm:ss'>20:00:00</Select.Option>
                        <Select.Option value='hh:mm:ss A'>08:00:00 AM</Select.Option>
                    </Select>
                </Form.Item>
            </Info>
            <Info description={generalInfo.language.description} title={generalInfo.language.title}>
                <Form.Item label={generalInfo.language.title} name='language'>
                    <Select>
                        <Select.Option value='English'>English</Select.Option>
                        <Select.Option value='Indonesia'>Indonesia</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <SaveButton />
                </Form.Item>
            </Info>
        </Form>
    );
}
