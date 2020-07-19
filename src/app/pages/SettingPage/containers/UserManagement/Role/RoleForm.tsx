import * as React from 'react';
import { Form } from 'antd';

import { USER_MANAGEMENT } from 'src/app/pages/SettingPage/containers/UserManagement/schema.gql';

import { Lang } from 'src/core/api';

import { Input, InputArea } from 'src/shared/components/Input';
import { SaveButton } from 'src/shared/components/SaveButton';
import { Spin } from 'src/shared/components/Spin';
import { mutationForm, queryForm } from 'src/shared/graphql';
import { Progress } from 'src/shared/utilities/progress';

import { roleForms } from './constants';
import { createRole, getRoleById, ROLE_BY_ID, updateRole } from './schema.gql';

export interface RoleFormProps extends Lang {
    formType: string;
    recordKey?: string;
}

export function RoleForm({ formType, lang, recordKey }: RoleFormProps) {
    let [form] = Form.useForm();

    let mutation = mutationForm({
        formType,
        mutations: formType === 'create' ? createRole : updateRole,
    });
    let query = queryForm({
        skip: formType === 'create',
        query: getRoleById,
        variables: { id: recordKey },
    });
    if (mutation.loading || query.loading) return <Spin />;

    let initialValues = {
        name: query.data?.getRoleById.name,
        description: query.data?.getRoleById.description,
    };

    function handleFinish(values: any) {
        Progress(true);

        let { name, description } = values;
        let fetchQuery;

        switch (formType) {
            case 'create':
                fetchQuery = [{ query: USER_MANAGEMENT }];
                recordKey = undefined;
                form.resetFields(['name', 'description']);
                break;
            case 'update':
                fetchQuery = [{ query: ROLE_BY_ID, variables: { id: recordKey } }];
                break;
        }

        mutation.action({
            refetchQueries: fetchQuery,
            variables: {
                payload: { id: recordKey, name: name, description: description },
            },
        });
    }

    return (
        <Form form={form} initialValues={initialValues} layout='vertical' onFinish={handleFinish}>
            <Form.Item
                label={roleForms.name.label[lang]}
                name='name'
                rules={[{ required: true, message: roleForms.name.message[lang] }]}
            >
                <Input />
            </Form.Item>
            <Form.Item label={roleForms.description.label[lang]} name='description'>
                <InputArea />
            </Form.Item>
            <Form.Item>
                <SaveButton />
            </Form.Item>
        </Form>
    );
}
