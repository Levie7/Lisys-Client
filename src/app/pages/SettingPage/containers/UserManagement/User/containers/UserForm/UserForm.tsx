import * as React from 'react';
import { Form } from 'antd';

import { SaveSettingButton } from 'src/app/pages/SettingPage/components/SaveSettingButton';
import { USER_MANAGEMENT } from 'src/app/pages/SettingPage/containers/UserManagement/schema.gql';

import { Button } from 'src/shared/components/Button';
import { Icon } from 'src/shared/components/Icon';
import { Input } from 'src/shared/components/Input';
import { Spin } from 'src/shared/components/Spin';
import { mutationForm } from 'src/shared/graphql/mutationForm';
import { ErrorHandler } from 'src/shared/utilities/errors';
import { Progress } from 'src/shared/utilities/progress';

import { createUser, getUserById, USERS, USER_BY_ID, updateUser } from '../schema.gql';

interface UserFormProps {
    formType: string;
    recordKey?: string;
}

export function UserForm({ formType, recordKey }: UserFormProps) {
    let [form] = Form.useForm();
    let [isPasswordChanged, changePassword] = React.useState(false);
    let [isUsernameChanged, changeUsername] = React.useState(false);

    let mutation = mutationForm(formType, formType === 'create' ? createUser : updateUser);
    let query = handleQuery({ formType, recordKey });
    if (mutation.loading || query.loading) return <Spin />;

    let initialValues = {
        username: query.data?.getUserById.username,
        name: query.data?.getUserById.name,
    };

    function handleChangePassword() {
        changePassword(true);
    }

    function handleChangeUsername() {
        changeUsername(initialValues.username !== form.getFieldValue('username') ? true : false);
    }

    function handleFinish(values: any) {
        Progress(true);

        let { name, password, username } = values;
        let fetchPayload = {
            id: recordKey,
            name,
            username,
            password,
        };
        let fetchQuery;
        let payload;

        switch (formType) {
            case 'create':
                fetchQuery = [{ query: USERS }, { query: USER_MANAGEMENT }];
                payload = fetchPayload;
                form.resetFields(['confirm_password', 'name', 'password', 'username']);
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

    function handleQuery(options: any) {
        let { data, loading } = getUserById({
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
                <SaveSettingButton />
            </Form.Item>
        </Form>
    );
}
