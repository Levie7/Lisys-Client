import { ApolloProvider } from '@apollo/react-hooks';
import { act, fireEvent, render } from '@testing-library/react';
import { mount } from 'enzyme';
import { createMockClient } from 'mock-apollo-client';
import React from 'react';

import { MasterSupplierForm } from './MasterSupplierForm';
import { SUPPLIER_BY_ID } from './schema.gql';

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
let mockInitialValues = {
    account_name: 'account1',
    account_no: '123',
    address: 'address1',
    bank: 'bank1',
    city: 'city1',
    contact: 'contact1',
    email: 'email@email.com',
    name: 'name1',
    npwp: '123',
    phone: '123',
    province: 'province1',
    zip_code: '123',
};
describe('MasterSupplierForm', () => {
    let wrap: any;
    let props = {
        auth: 'username1',
        formType: 'update',
        recordKey: 'id1',
    };
    let queryHandler = jest.fn().mockResolvedValue({
        data: {
            getSupplierById: {
                account_name: 'account1',
                account_no: '123',
                address: 'address1',
                bank: 'bank1',
                city: 'city1',
                contact: 'contact1',
                email: 'email@email.com',
                name: 'name1',
                npwp: '123',
                phone: '123',
                province: 'province1',
                zip_code: '123',
            },
        },
    });
    mockClient.setRequestHandler(SUPPLIER_BY_ID, queryHandler);

    it('should render master supplier page and master card', async () => {
        await act(async () => {
            wrap = mount(
                <ApolloProvider client={mockClient}>
                    <MasterSupplierForm {...props} />
                </ApolloProvider>
            );
        });

        expect(wrap.find('MasterSupplierForm').exists()).toBeTruthy();
    });

    describe('when data is loaded', () => {
        describe('when formType is create', () => {
            let initialUndefined: any;
            beforeEach(async () => {
                initialUndefined = {
                    name: undefined,
                    description: undefined,
                };
                props = { ...props, formType: 'create' };
                await act(async () => {
                    wrap = mount(
                        <ApolloProvider client={mockClient}>
                            <MasterSupplierForm {...props} />
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
                                <MasterSupplierForm {...props} />
                            </ApolloProvider>
                        );
                        fireEvent.change(container.querySelector('input#name')!, {
                            target: { value: 'name1', name: 'name' },
                        });
                        fireEvent.change(container.querySelector('input#phone')!, {
                            target: { value: '123', name: 'phone' },
                        });
                        fireEvent.submit(getByText('Save'));
                    });
                    expect(wrap.find('input#name').props().value).toEqual('');
                });
            });
        });

        describe('when formType is update', () => {
            beforeEach(async () => {
                props = { ...props, formType: 'update' };
                await act(async () => {
                    wrap = mount(
                        <ApolloProvider client={mockClient}>
                            <MasterSupplierForm {...props} />
                        </ApolloProvider>
                    );
                });
            });

            it('should render form with data', () => {
                expect(wrap.find('ForwardRef(InternalForm)').exists()).toBeTruthy();
                expect(wrap.find('ForwardRef(InternalForm)').props().initialValues).toEqual(
                    mockInitialValues
                );
            });

            describe('when user submit form', () => {
                it('should reset fields match to initial values', async () => {
                    await act(async () => {
                        const { getByText } = render(
                            <ApolloProvider client={mockClient}>
                                <MasterSupplierForm {...props} />
                            </ApolloProvider>
                        );

                        fireEvent.submit(getByText('Save'));
                    });

                    expect(wrap.find('ForwardRef(InternalForm)').props().initialValues).toEqual(
                        mockInitialValues
                    );
                });
            });
        });
    });
});
