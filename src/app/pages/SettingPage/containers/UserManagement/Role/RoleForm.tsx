import * as React from 'react';
import { Form } from 'antd';

import { USER_MANAGEMENT } from 'src/app/pages/SettingPage/containers/UserManagement/schema.gql';

import { Input, InputArea } from 'src/shared/components/Input';
import { SaveButton } from 'src/shared/components/SaveButton';
import { Spin } from 'src/shared/components/Spin';
import { mutationForm } from 'src/shared/graphql/mutationForm';
import { ErrorHandler } from 'src/shared/utilities/errors';
import { Progress } from 'src/shared/utilities/progress';

import { createRole, getRoleById, ROLE_BY_ID, ROLES, updateRole } from './schema.gql';

interface RoleFormProps {
    formType: string;
    recordKey?: string;
}

export function RoleForm({ formType, recordKey }: RoleFormProps) {
    let [form] = Form.useForm();

    let mutation = mutationForm(formType === 'create' ? createRole : updateRole, formType);
    let query = handleQuery({ formType, recordKey });
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
                fetchQuery = [{ query: ROLES }, { query: USER_MANAGEMENT }];
                form.resetFields(['name', 'description']);
                break;
            case 'update':
                fetchQuery = [
                    { query: ROLES },
                    { query: ROLE_BY_ID, variables: { id: recordKey } },
                ];
                break;
            default:
                break;
        }

        mutation.action({
            refetchQueries: fetchQuery,
            variables: {
                payload: { id: recordKey, name: name, description: description },
            },
        });
    }

    function handleQuery(options: any) {
        let { data, loading } = getRoleById({
            onError(error: any) {
                ErrorHandler(error);
            },
            skip: options.formType === 'create',
            variables: { id: options.recordKey },
        });

        return {
            data,
            loading,
        };
    }

    return (
        <Form form={form} initialValues={initialValues} layout='vertical' onFinish={handleFinish}>
            <Form.Item
                label='Role Name'
                name='name'
                rules={[{ required: true, message: 'Please input the role name' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item label='Description' name='description'>
                <InputArea />
            </Form.Item>
            <Form.Item>
                <SaveButton />
            </Form.Item>
        </Form>
    );
}
