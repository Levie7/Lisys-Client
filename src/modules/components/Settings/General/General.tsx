import * as React from 'react';

import { SettingGeneral } from 'src/core/api';

import { InfoSetting } from 'src/modules/components/Settings/InfoSetting/InfoSetting';

import { Breadcrumb } from 'src/shared/components/Breadcrumb';
import { Button } from 'src/shared/components/Button';
import { Form, FormProps } from 'src/shared/components/Form';
import { Select } from 'src/shared/components/Select';
import { Spin } from 'src/shared/components/Spin';
import { UIContext } from 'src/shared/contexts/UIContext';
import { Errors } from 'src/shared/utilities/errors';
import { Message } from 'src/shared/utilities/message';
import { Progress } from 'src/shared/utilities/progress';

import { generalInfo } from './constants';
import { getSettings, setUpdateSettings, SETTING } from '../schema.gql';
import { convertArrayOfObjectsToObject } from '../helpers';

function General(props: FormProps) {
    let { data, error: queryError, loading: queryLoading } = getSettings({
        variables: { category: 'general' },
    });
    let [updateSetting, { error: mutationError, loading: mutationLoading }] = setUpdateSettings({
        onCompleted() {
            Progress(false);
            return <>{Message('Update data successfully', 'success')}</>;
        },
    });

    if (queryLoading || mutationLoading) return <Spin />;
    if (queryError || mutationError) return Errors(queryError! || mutationError!);

    function handleSubmit(e: any) {
        e.preventDefault();
        let { form } = props;

        form!.validateFields((err: any, values: any) => {
            if (!err) {
                let { date_format, time_format, language } = values;

                Progress(true);
                updateSetting({
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
        });
    }

    function renderContent() {
        let { getFieldDecorator } = props.form!;

        return (
            <Form onSubmit={handleSubmit}>
                <InfoSetting
                    description={generalInfo.dateTime.description}
                    title={generalInfo.dateTime.title}
                >
                    <Form.Item label='Date Format'>
                        {getFieldDecorator('date_format', {
                            initialValue: general.date_format,
                            rules: [{ required: true, message: 'Please set the date format' }],
                        })(
                            <Select>
                                <Select.Option value='D-M-YYYY'>1-1-2020</Select.Option>
                                <Select.Option value='DD-MM-YYYY'>01-01-2020</Select.Option>
                                <Select.Option value='D MMM YYYY'>1 Jan 2020</Select.Option>
                                <Select.Option value='DD MMM YYYY'>01 Jan 2020</Select.Option>
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item label='Time Format'>
                        {getFieldDecorator('time_format', {
                            initialValue: general.time_format,
                            rules: [{ required: true, message: 'Please set the time format' }],
                        })(
                            <Select>
                                <Select.Option value='HH:mm'>08:00</Select.Option>
                                <Select.Option value='hh:mm A'>08:00 AM</Select.Option>
                                <Select.Option value='HH:mm:ss'>20:00:00</Select.Option>
                                <Select.Option value='hh:mm:ss A'>08:00:00 AM</Select.Option>
                            </Select>
                        )}
                    </Form.Item>
                </InfoSetting>
                <InfoSetting
                    description={generalInfo.language.description}
                    title={generalInfo.language.title}
                >
                    <Form.Item label={generalInfo.language.title}>
                        {getFieldDecorator('language', {
                            initialValue: general.language,
                            rules: [{ required: true, message: 'Please set the Language' }],
                        })(
                            <Select>
                                <Select.Option value='English'>English</Select.Option>
                                <Select.Option value='Indonesia'>Indonesia</Select.Option>
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item>
                        <UIContext.Consumer>
                            {({ isMobile }) => (
                                <Button
                                    className={isMobile ? 'w-100' : ''}
                                    htmlType='submit'
                                    type='primary'
                                >
                                    Save
                                </Button>
                            )}
                        </UIContext.Consumer>
                    </Form.Item>
                </InfoSetting>
            </Form>
        );
    }

    let general = convertArrayOfObjectsToObject(data?.getSettingsByCategory) as SettingGeneral;

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item href='/settings'>Settings</Breadcrumb.Item>
                <Breadcrumb.Item>General</Breadcrumb.Item>
            </Breadcrumb>
            {general ? (
                renderContent()
            ) : (
                <>{Message('Error - Failed to load data source', 'error')}</>
            )}
        </>
    );
}

export default Form.create({ name: 'generalForm' })(General);
