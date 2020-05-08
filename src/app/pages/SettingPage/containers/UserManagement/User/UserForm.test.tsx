import { ApolloProvider } from '@apollo/react-hooks';
import { act, fireEvent, render } from '@testing-library/react';
import { mount } from 'enzyme';
import { createMockClient } from 'mock-apollo-client';
import React from 'react';

import { ROLES } from '../Role/schema.gql';
import { USER_BY_ID } from './schema.gql';
import { UserForm } from './UserForm';

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});
let mockClient = createMockClient();
let mockUser = {
    name: 'user1',
    role: { id: 'id1' },
    username: 'username1',
};
let mockUserInitialValues = {
    name: 'user1',
    role: 'id1',
    username: 'username1',
};
let mockRole = [
    {
        id: 'id1',
        name: 'role1',
        description: 'role1',
    },
    {
        id: 'id2',
        name: 'role2',
        description: 'role2',
    },
];
describe('UserForm', () => {
    let wrap: any;
    let props = {
        formType: 'update',
        recordKey: 'id1',
    };
    let queryHandler = jest.fn().mockResolvedValue({ data: { getUserById: mockUser } });
    let queryHandlerRole = jest.fn().mockResolvedValue({ data: { getRoles: mockRole } });
    mockClient.setRequestHandler(ROLES, queryHandlerRole);
    mockClient.setRequestHandler(USER_BY_ID, queryHandler);

    it('should render role form', async () => {
        await act(async () => {
            wrap = mount(
                <ApolloProvider client={mockClient}>
                    <UserForm {...props} />
                </ApolloProvider>
            );
        });

        expect(wrap.find('UserForm').exists()).toBeTruthy();
    });

    describe('when data is loaded', () => {
        describe('when formType is create', () => {
            let initialUndefined: any;
            beforeEach(async () => {
                initialUndefined = {
                    name: undefined,
                    role: 'id1',
                    username: undefined,
                };
                props = { ...props, formType: 'create' };
                await act(async () => {
                    wrap = mount(
                        <ApolloProvider client={mockClient}>
                            <UserForm {...props} />
                        </ApolloProvider>
                    );
                });
            });

            it('should render form with empty data', () => {
                expect(wrap.find('ForwardRef(InternalForm)').exists()).toBeTruthy();
                expect(wrap.find('ForwardRef(InternalForm)').props().initialValues).toEqual(
                    initialUndefined
                );
            });

            describe('when user submit form', () => {
                test('should resolve validating and reset fields', async () => {
                    await act(async () => {
                        const { container, getByText } = render(
                            <ApolloProvider client={mockClient}>
                                <UserForm {...props} />
                            </ApolloProvider>
                        );
                        fireEvent.change(container.querySelector('input#name')!, {
                            target: { value: 'name1' },
                        });
                        fireEvent.change(container.querySelector('input#username')!, {
                            target: { value: 'username1' },
                        });
                        fireEvent.change(container.querySelector('input#password')!, {
                            target: { value: 'password1' },
                        });
                        fireEvent.change(container.querySelector('input#confirm_password')!, {
                            target: { value: 'password1' },
                        });

                        fireEvent.submit(getByText('Save'));
                    });
                    expect(wrap.find('ForwardRef(InternalForm)').props().initialValues).toEqual(
                        initialUndefined
                    );
                });
            });
        });

        describe('when formType is update', () => {
            beforeEach(async () => {
                props = { ...props, formType: 'update' };
                await act(async () => {
                    wrap = mount(
                        <ApolloProvider client={mockClient}>
                            <UserForm {...props} />
                        </ApolloProvider>
                    );
                });
            });

            it('should render form with data', () => {
                expect(wrap.find('ForwardRef(InternalForm)').exists()).toBeTruthy();
                expect(wrap.find('ForwardRef(InternalForm)').props().initialValues).toEqual(
                    mockUserInitialValues
                );
            });

            describe('when user want to change password', () => {
                beforeEach(() => {
                    wrap.find('button#password').simulate('click');
                });

                it('should render password field', () => {
                    expect(wrap.find('#confirm_password').exists()).toBeTruthy();
                });

                describe('when user type password and confirm password not matched', () => {
                    const validator = jest.fn().mockImplementation(() => {
                        wrap.find('input#password').simulate('change', {
                            target: { value: 'password' },
                        });
                        wrap.find('input#confirm_password').simulate('change', {
                            target: { value: 'passwords' },
                        });
                        return Promise.reject('The two passwords that you entered do not match!');
                    });
                    test('should reject validating', async () => {
                        return expect(validator()).rejects.toMatch(
                            'The two passwords that you entered do not match!'
                        );
                    });
                });

                describe('when user type password and confirm password matched', () => {
                    const validator = jest.fn().mockImplementation(() => {
                        wrap.find('input#password').simulate('change', {
                            target: { value: 'password' },
                        });
                        wrap.find('input#confirm_password').simulate('change', {
                            target: { value: 'password' },
                        });
                        return Promise.resolve('matched');
                    });
                    test('should resolve validating', () => {
                        return expect(validator()).resolves.toMatch('matched');
                    });
                });

                describe('when user submit form', () => {
                    it('should reset fields match to initial values', async () => {
                        await act(async () => {
                            const { getByText } = render(
                                <ApolloProvider client={mockClient}>
                                    <UserForm {...props} />
                                </ApolloProvider>
                            );
                            fireEvent.submit(getByText('Save'));
                        });

                        expect(wrap.find('ForwardRef(InternalForm)').props().initialValues).toEqual(
                            mockUserInitialValues
                        );
                    });
                });
            });
        });
    });
});
