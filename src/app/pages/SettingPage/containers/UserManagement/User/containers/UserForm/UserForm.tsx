import * as React from 'react';
import { Form } from 'antd';

import { getRoles } from 'src/app/pages/SettingPage/containers/UserManagement/Role/containers/schema.gql';
import {
    createUser,
    getUserById,
    updateUser,
    USER_BY_ID,
    USERS,
} from 'src/app/pages/SettingPage/containers/UserManagement/User/containers/schema.gql';
import { USER_MANAGEMENT } from 'src/app/pages/SettingPage/containers/UserManagement/schema.gql';

import { Button } from 'src/shared/components/Button';
import { Icon } from 'src/shared/components/Icon';
import { Input } from 'src/shared/components/Input';
import { SaveButton } from 'src/shared/components/SaveButton';
import { Select } from 'src/shared/components/Select';
import { Spin } from 'src/shared/components/Spin';
import { mutationForm } from 'src/shared/graphql/mutationForm';
import { ErrorHandler } from 'src/shared/utilities/errors';
import { Progress } from 'src/shared/utilities/progress';

interface UserFormProps {
    formType: string;
    recordKey?: string;
}

export function UserForm({ formType, recordKey }: UserFormProps) {
    let [form] = Form.useForm();
    let [isPasswordChanged, changePassword] = React.useState(false);
    let [isUsernameChanged, changeUsername] = React.useState(false);

    let mutation = mutationForm(formType, formType === 'create' ? createUser : updateUser);
    let query = handleQuery(
        { isSkip: formType === 'create' ? true : false, variables: { id: recordKey } },
        getUserById
    );
    let roleQuery = handleQuery(undefined, getRoles);
    if (mutation.loading || query.loading || roleQuery.loading) return <Spin />;

    let initialValues = {
        name: query.data?.getUserById.name,
        role: query.data?.getUserById.role.id,
        username: query.data?.getUserById.username,
    };

    let roles = roleQuery.data?.getRoles;

    function handleChangePassword() {
        changePassword(true);
    }

    function handleChangeUsername() {
        changeUsername(initialValues.username !== form.getFieldValue('username'));
    }

    function handleFinish(values: any) {
        Progress(true);

        let { name, password, role, username } = values;
        let fetchPayload = {
            id: recordKey,
            name,
            password,
            role,
            username,
        };
        let fetchQuery;
        let payload;

        switch (formType) {
            case 'create':
                fetchQuery = [{ query: USERS }, { query: USER_MANAGEMENT }];
                payload = fetchPayload;
                form.resetFields(['confirm_password', 'name', 'password', 'role', 'username']);
                break;
            case 'update':
                fetchQuery = [
                    { query: USERS },
                    { query: USER_BY_ID, variables: { id: recordKey } },
                ];
                payload = { ...fetchPayload, isPasswordChanged, isUsernameChanged };
                changePassword(false);
                form.resetFields(['confirm_password', 'password']);
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

    function renderPassword() {
        return (
            <>
                <Form.Item
                    hasFeedback
                    label='Password'
                    name='password'
                    rules={[{ required: true, message: 'Please input the password' }]}
                >
                    <Input type='password' />
                </Form.Item>
                <Form.Item
                    dependencies={['password']}
                    hasFeedback
                    label='Confirm Password'
                    name='confirm_password'
                    rules={[
                        { required: true, message: 'Please confirm your password' },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }

                                return Promise.reject(
                                    'The two passwords that you entered do not match!'
                                );
                            },
                        }),
                    ]}
                >
                    <Input type='password' />
                </Form.Item>
            </>
        );
    }

    return (
        <Form form={form} initialValues={initialValues} layout='vertical' onFinish={handleFinish}>
            <Form.Item
                label='Username'
                name='username'
                rules={[{ required: true, message: 'Please input the username' }]}
            >
                <Input onChange={handleChangeUsername} />
            </Form.Item>
            <Form.Item
                label='Name'
                name='name'
                rules={[{ required: true, message: 'Please input the name' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label='Role'
                name='role'
                rules={[{ required: true, message: 'Please select the role' }]}
            >
                <Select>
                    {roles &&
                        roles.map((role: any) => (
                            <Select.Option key={role.id} value={role.id}>
                                {role.name}
                            </Select.Option>
                        ))}
                </Select>
            </Form.Item>
            {formType === 'update' ? (
                !isPasswordChanged ? (
                    <Form.Item hasFeedback label='Password' name='password'>
                        <Button onClick={handleChangePassword} type='default'>
                            {Icon.lock} Change Password
                        </Button>
                    </Form.Item>
                ) : (
                    renderPassword()
                )
            ) : (
                renderPassword()
            )}
            <Form.Item>
                <SaveButton />
            </Form.Item>
        </Form>
    );
}
