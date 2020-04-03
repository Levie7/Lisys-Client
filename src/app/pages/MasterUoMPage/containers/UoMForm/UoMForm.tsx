import * as React from 'react';
import { Form } from 'antd';

import { SaveSettingButton } from 'src/app/pages/SettingPage/components/SaveSettingButton';
import { getRoles } from 'src/app/pages/SettingPage/containers/UserManagement/Role/containers/schema.gql';
import {
    createUoM,
    getUoMById,
    UOM_BY_ID,
    UOMS,
    updateUoM,
} from 'src/app/pages/MasterUoMPage/containers/schema.gql';

import { Input, InputArea } from 'src/shared/components/Input';
import { Spin } from 'src/shared/components/Spin';
import { mutationForm } from 'src/shared/graphql/mutationForm';
import { ErrorHandler } from 'src/shared/utilities/errors';
import { Progress } from 'src/shared/utilities/progress';

interface UoMFormProps {
    formType: string;
    recordKey?: string;
}

export function UoMForm({ formType, recordKey }: UoMFormProps) {
    let [form] = Form.useForm();

    let mutation = mutationForm(formType, formType === 'create' ? createUoM : updateUoM);
    let query = handleQuery(
        { isSkip: formType === 'create' ? true : false, variables: { id: recordKey } },
        getUoMById
    );
    let roleQuery = handleQuery(undefined, getRoles);
    if (mutation.loading || query.loading || roleQuery.loading) return <Spin />;

    let initialValues = {
        name: query.data?.getUoMById.name,
        description: query.data?.getUoMById.description,
    };

    function handleFinish(values: any) {
        Progress(true);

        let { name, description } = values;
        let fetchQuery;
        let payload = {
            id: recordKey,
            name,
            description,
        };

        switch (formType) {
            case 'create':
                fetchQuery = [{ query: UOMS }];
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

    function handleQuery(options: any, queries: any) {
        let { data, loading } = queries({
            onError(error: any) {
                ErrorHandler(error);
            },
            skip: options && options.isSkip,
            variables: options && options.variables,
        });

        return {
            data,
            loading,
        };
    }

    return (
        <Form form={form} initialValues={initialValues} layout='vertical' onFinish={handleFinish}>
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
                <SaveSettingButton />
            </Form.Item>
        </Form>
    );
}
