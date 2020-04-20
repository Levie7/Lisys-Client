import * as React from 'react';
import { Form } from 'antd';

import { Alert } from 'src/shared/components/Alert';
import { Info } from 'src/shared/components/Info';
import { Input, InputArea } from 'src/shared/components/Input';
import { SaveButton } from 'src/shared/components/SaveButton';
import { Spin } from 'src/shared/components/Spin';
import { mutationForm, queryForm } from 'src/shared/graphql';
import {
    createUoM,
    getUoMById,
    UOM_BY_ID,
    UOMS,
    updateUoM,
} from 'src/shared/graphql/UoM/schema.gql';
import { Progress } from 'src/shared/utilities/progress';

import { alertMessage } from './constants';

interface UoMFormProps {
    formType: string;
    recordKey?: string;
}

export function MasterUoMForm({ formType, recordKey }: UoMFormProps) {
    let [form] = Form.useForm();

    let mutation = mutationForm(formType === 'create' ? createUoM : updateUoM, formType);
    let query = queryForm({
        skip: formType === 'create',
        query: getUoMById,
        variables: { id: recordKey },
    });

    if (mutation.loading || query.loading) return <Spin />;

    let initialValues = {
        name: query.data?.getUoMById.name,
        description: query.data?.getUoMById.description,
    };

    function handleFinish(values: any) {
        Progress(true);

        let { name, description = '' } = values;
        let fetchQuery;
        let payload = {
            id: recordKey,
            name,
            description,
        };

        switch (formType) {
            case 'create':
                fetchQuery = [{ query: UOMS }];
                payload = { ...payload, id: undefined };
                form.resetFields(['name', 'description']);
                break;
            case 'update':
                fetchQuery = [{ query: UOMS }, { query: UOM_BY_ID, variables: { id: recordKey } }];
                break;
            default:
                break;
        }

        mutation.action({
            refetchQueries: fetchQuery,
            variables: {
                payload,
            },
        });
    }

    return (
        <>
            <Alert message={alertMessage} type='info' showIcon />
            <Form
                form={form}
                initialValues={initialValues}
                layout='vertical'
                onFinish={handleFinish}
            >
                <Info
                    description='General fields to create or update UoM data'
                    title='General Information'
                >
                    <Form.Item
                        label='Name'
                        name='name'
                        rules={[{ required: true, message: 'Please input the name' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label='Description' name='description'>
                        <InputArea />
                    </Form.Item>
                    <Form.Item>
                        <SaveButton />
                    </Form.Item>
                </Info>
            </Form>
        </>
    );
}
