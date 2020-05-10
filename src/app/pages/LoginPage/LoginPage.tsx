import { Form, Layout } from 'antd';
import React from 'react';

import { updateAuth, useIsAuthenticated } from 'src/core/graphql/auth';
import { useHistory } from 'src/core/route';

import { Button } from 'src/shared/components/Button';
import { Card } from 'src/shared/components/Card';
import { Divider } from 'src/shared/components/Divider';
import { Icon } from 'src/shared/components/Icon';
import { Input } from 'src/shared/components/Input';
import { Picture } from 'src/shared/components/Picture';
import { queryForm } from 'src/shared/graphql';
import { authLogin } from 'src/shared/graphql/User/schema.gql';
import { Message } from 'src/shared/utilities/message';

require('./LoginPage.sass');

export function LoginPage() {
    let isAuthenticated = useIsAuthenticated();
    let { location, replace } = useHistory();
    if (isAuthenticated) replace(location.state?.from || '/');

    let [form] = Form.useForm();
    let [login, setLogin] = React.useState({ username: '', password: '', isLogin: false });
    let [fetch] = updateAuth();
    let authCheck = queryForm({
        query: authLogin,
        skip: login.username === '' || login.password === '',
        variables: { payload: { username: login.username, password: login.password } },
    });

    let auth = authCheck.data?.authLogin;

    function handleFinish(values: any) {
        let { username, password } = values;

        setLogin({ ...login, username, password });
    }

    function isFieldEmpty() {
        return login.username === '' || login.password === '';
    }

    if (!authCheck.loading && !login.isLogin && auth) {
        fetch({
            variables: {
                payload: { isSessionAuthenticated: true, username: login.username },
            },
        });
        setLogin({ ...login, isLogin: true });
    } else if (!authCheck.loading && !isFieldEmpty() && !auth) {
        Message('Username or Password incorrect', 'error');
    }

    return (
        <Layout>
            <Layout.Content className='d-flex fj-center'>
                <Card bodyStyle={{ width: '100%' }} className='LoginCard m-4'>
                    <Divider orientation='center'>
                        <h1>Login</h1>
                    </Divider>
                    <Form className='mt-7' form={form} layout='vertical' onFinish={handleFinish}>
                        <Form.Item
                            label='Username'
                            name='username'
                            rules={[{ required: true, message: 'Please input the username' }]}
                        >
                            <Input prefix={Icon['user']} />
                        </Form.Item>
                        <Form.Item
                            label='Password'
                            name='password'
                            rules={[{ required: true, message: 'Please input the password' }]}
                        >
                            <Input prefix={Icon['lock']} type='password' />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type='primary'
                                htmlType='submit'
                                className='mt-5 w-100'
                                loading={authCheck.loading}
                            >
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                    <div className='d-flex fd-column ta-center mt-8'>
                        Powered By
                        <Picture
                            alt='Lisys-Logo'
                            imgClassName='w-25'
                            src={require('src/app/shell/components/MainMenu/assets/logo-dark.png')}
                        />
                        © {new Date().getFullYear()}
                    </div>
                </Card>
            </Layout.Content>
        </Layout>
    );
}
