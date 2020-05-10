import * as React from 'react';
import { Form } from 'antd';

import { Alert } from 'src/shared/components/Alert';
import { Info } from 'src/shared/components/Info';
import { Input, InputArea } from 'src/shared/components/Input';
import { SaveButton } from 'src/shared/components/SaveButton';
import { Spin } from 'src/shared/components/Spin';
import { mutationForm, queryForm } from 'src/shared/graphql';
import {
    createVariant,
    getVariantById,
    updateVariant,
    VARIANT_BY_ID,
} from 'src/shared/graphql/Variant/schema.gql';
import { Progress } from 'src/shared/utilities/progress';

import { alertMessage } from './constants';

interface MasterVariantFormProps {
    auth: string | null;
    formType: string;
    recordKey?: string;
}

export function MasterVariantForm({ auth, formType, recordKey }: MasterVariantFormProps) {
    let [form] = Form.useForm();

    let mutation = mutationForm({
        formType,
        mutations: formType === 'create' ? createVariant : updateVariant,
        resetForm: handleResetForm,
    });
    let query = queryForm({
        skip: formType === 'create',
        query: getVariantById,
        variables: { id: recordKey },
    });
    if (mutation.loading || query.loading) return <Spin />;

    let initialValues = {
        name: query.data?.getVariantById.name,
        description: query.data?.getVariantById.description,
    };

    function handleFinish(values: any) {
        Progress(true);

        let { name, description = '' } = values;
        let fetchQuery;
        let fetchPayload = {
            id: recordKey,
            name,
            description,
        };
        let payload;

        switch (formType) {
            case 'create':
                payload = { ...fetchPayload, id: undefined, created_by: auth };
                break;
            case 'update':
                fetchQuery = [{ query: VARIANT_BY_ID, variables: { id: recordKey } }];
                payload = { ...fetchPayload, updated_by: auth };
                break;
        }

        mutation.action({
            refetchQueries: fetchQuery,
            variables: {
                payload,
            },
        });
    }

    function handleResetForm() {
        form.resetFields(['name', 'description']);
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
                    description='General fields to create or update variant data'
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
