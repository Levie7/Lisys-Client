import * as React from 'react';
import { Form } from 'antd';

import { getRoles } from 'src/app/pages/SettingPage/containers/UserManagement/Role/schema.gql';
import { USER_MANAGEMENT } from 'src/app/pages/SettingPage/containers/UserManagement/schema.gql';

import { Lang } from 'src/core/api';

import { Button } from 'src/shared/components/Button';
import { Icon } from 'src/shared/components/Icon';
import { Input } from 'src/shared/components/Input';
import { SaveButton } from 'src/shared/components/SaveButton';
import { Select } from 'src/shared/components/Select';
import { Spin } from 'src/shared/components/Spin';
import { mutationForm, queryForm } from 'src/shared/graphql';
import {
    createUser,
    getUserById,
    updateUser,
    USER_BY_ID,
} from 'src/shared/graphql/User/schema.gql';
import { Progress } from 'src/shared/utilities/progress';

import { userForm } from './constants';

export interface UserFormProps extends Lang {
    formType: string;
    recordKey?: string;
}

export function UserForm({ formType, lang, recordKey }: UserFormProps) {
    let [form] = Form.useForm();
    let [isPasswordChanged, changePassword] = React.useState(false);
    let [isUsernameChanged, changeUsername] = React.useState(false);

    let mutation = mutationForm({
        formType,
        mutations: formType === 'create' ? createUser : updateUser,
        resetForm: handleResetForm,
    });
    let query = queryForm({
        skip: formType === 'create',
        query: getUserById,
        variables: { id: recordKey },
    });
    let roleQuery = queryForm({ query: getRoles });
    if (mutation.loading || query.loading || roleQuery.loading) return <Spin />;

    let roles = roleQuery.data?.getRoles;

    let initialValues = {
        name: query.data?.getUserById.name,
        role: query.data?.getUserById.role.id || (roles && roles[0].id),
        username: query.data?.getUserById.username,
    };

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
                fetchQuery = [{ query: USER_MANAGEMENT }];
                payload = { ...fetchPayload, id: undefined };
                break;
            case 'update':
                fetchQuery = [{ query: USER_BY_ID, variables: { id: recordKey } }];
                payload = { ...fetchPayload, isPasswordChanged, isUsernameChanged };
                changePassword(false);
                form.resetFields(['confirm_password', 'password']);
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
        form.resetFields(['confirm_password', 'name', 'password', 'role', 'username']);
    }

    function renderPassword() {
        return (
            <>
                <Form.Item
                    hasFeedback
                    label={userForm.password.label[lang]}
                    name='password'
                    rules={[{ required: true, message: userForm.password.message[lang] }]}
                >
                    <Input type='password' />
                </Form.Item>
                <Form.Item
                    dependencies={['password']}
                    hasFeedback
                    label={userForm.confirm_password.label[lang]}
                    name='confirm_password'
                    rules={[
                        { required: true, message: userForm.confirm_password.label[lang] },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }

                                return Promise.reject(userForm.confirm_password.feedback[lang]);
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
                label={userForm.username.label[lang]}
                name='username'
                rules={[{ required: true, message: userForm.username.message[lang] }]}
            >
                <Input onChange={handleChangeUsername} />
            </Form.Item>
            <Form.Item
                label={userForm.name.label[lang]}
                name='name'
                rules={[{ required: true, message: userForm.name.message[lang] }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label={userForm.role.label[lang]}
                name='role'
                rules={[{ required: true, message: userForm.role.message[lang] }]}
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
