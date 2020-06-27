import { ApolloProvider } from '@apollo/react-hooks';
import { act, fireEvent, render } from '@testing-library/react';
import { mount } from 'enzyme';
import { createMockClient } from 'mock-apollo-client';
import moment from 'moment';
import React from 'react';

import { PURCHASING_LIST } from 'src/shared/graphql/Purchasing/schema.gql';
import { SUPPLIERS } from 'src/shared/graphql/Supplier/schema.gql';

import { PurchasePaymentForm } from './PurchasePaymentForm';
import { PURCHASE_PAYMENT_BY_ID } from './schema.gql';

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
    no: 'no1',
    date: moment().format('YYYY-MM-DD'),
    supplier: 'id1',
    payment_method: 'cash',
    payment_no: '123',
    description: 'description1',
};
let mockSupplier = [
    {
        id: 'id1',
        name: 'supplier1',
        description: 'supplier1',
        status: 'active',
    },
    {
        id: 'id2',
        name: 'supplier2',
        description: 'supplier2',
        status: 'active',
    },
];
let mockPurchasing = [
    {
        no: 'no1',
        date: moment().format('YYYY-MM-DD'),
        due_date: moment()
            .add(1, 'months')
            .format('YYYY-MM-DD'),
        id: 'id1',
        supplier: {
            id: 'id1',
            name: 'supplier1',
        },
        qty_total: 1,
        grand_total: 2000,
        credit_total: 2000,
        updated_by: {
            id: 'id1',
            name: 'name1',
        },
    },
    {
        no: 'no2',
        date: moment().format('YYYY-MM-DD'),
        due_date: moment()
            .add(1, 'months')
            .format('YYYY-MM-DD'),
        id: 'id2',
        supplier: {
            id: 'id2',
            name: 'supplier2',
        },
        qty_total: 1,
        grand_total: 2000,
        credit_total: 2000,
        updated_by: {
            id: 'id1',
            name: 'name1',
        },
    },
];
describe('PurchasePaymentForm', () => {
    let wrap: any;
    let props = {
        auth: 'username1',
        formType: 'update',
        recordKey: 'id1',
    };
    let queryHandler = jest.fn().mockResolvedValue({
        data: {
            getPurchasePaymentById: {
                credit_total: '2000',
                no: 'no1',
                date: moment(),
                description: 'description1',
                detail: [
                    {
                        id: 'id1',
                        purchasing: {
                            credit_total: 2000,
                            date: moment(),
                            due_date: moment().add(1, 'months'),
                            grand_total: 2000,
                            id: 'id1',
                            no: 'no1',
                        },
                        payment_amount: 2000,
                    },
                ],
                id: 'id1',
                payment_method: 'cash',
                payment_no: '123',
                payment_total: 2000,
                supplier: {
                    id: 'id1',
                    name: 'supplier1',
                },
            },
        },
    });
    let queryHandlerSupplier = jest
        .fn()
        .mockResolvedValue({ data: { getSuppliers: mockSupplier } });
    let queryHandlerPurchasing = jest.fn().mockResolvedValue({
        data: {
            getPurchasingList: {
                data: mockPurchasing,
                total: 2,
            },
        },
    });
    mockClient.setRequestHandler(PURCHASING_LIST, queryHandlerPurchasing);
    mockClient.setRequestHandler(SUPPLIERS, queryHandlerSupplier);
    mockClient.setRequestHandler(PURCHASE_PAYMENT_BY_ID, queryHandler);

    it('should render master category page and master card', async () => {
        await act(async () => {
            wrap = mount(
                <ApolloProvider client={mockClient}>
                    <PurchasePaymentForm {...props} />
                </ApolloProvider>
            );
        });

        expect(wrap.find('PurchasePaymentForm').exists()).toBeTruthy();
    });

    describe('when data is loaded', () => {
        describe('when formType is create', () => {
            let initialUndefined: any;
            beforeEach(async () => {
                initialUndefined = {
                    no: undefined,
                    date: moment().format('YYYY-MM-DD'),
                    supplier: 'id1',
                    payment_method: 'cash',
                    payment_no: undefined,
                    description: undefined,
                };
                props = { ...props, formType: 'create' };
                await act(async () => {
                    wrap = mount(
                        <ApolloProvider client={mockClient}>
                            <PurchasePaymentForm {...props} />
                        </ApolloProvider>
                    );
                });
            });

            it('should render form with empty data', () => {
                expect(wrap.find('ForwardRef(InternalForm)').exists()).toBeTruthy();
                expect(wrap.find('ForwardRef(InternalForm)').props().initialValues.no).toEqual(
                    initialUndefined.no
                );
                expect(
                    moment(wrap.find('ForwardRef(InternalForm)').props().initialValues.date).format(
                        'YYYY-MM-DD'
                    )
                ).toEqual(initialUndefined.date);
                expect(
                    wrap.find('ForwardRef(InternalForm)').props().initialValues.supplier
                ).toEqual(initialUndefined.supplier);
                expect(
                    wrap.find('ForwardRef(InternalForm)').props().initialValues.payment_method
                ).toEqual(initialUndefined.payment_method);
                expect(
                    wrap.find('ForwardRef(InternalForm)').props().initialValues.payment_no
                ).toEqual(initialUndefined.payment_no);
                expect(
                    wrap.find('ForwardRef(InternalForm)').props().initialValues.description
                ).toEqual(initialUndefined.description);
            });

            describe('when change supplier', () => {
                beforeEach(() => {
                    wrap
                        .find('Select#supplier')
                        .at(0)
                        .prop('onChange')();
                });
                it('should show purchasing list', () => {
                    expect(
                        wrap.find('ForwardRef(SearchPurchasingListPure)').props().supplier_id
                    ).toEqual('id1');
                });
            });

            describe('when entry data using list purchasing', () => {
                beforeEach(() => {
                    wrap.find('button#List').simulate('click');
                });
                it('should show purchasing list', () => {
                    expect(
                        wrap
                            .find('Memo(CrudListTablePure)')
                            .at(1)
                            .exists()
                    ).toBeTruthy();
                });
            });

            describe('when user submit form', () => {
                test('should resolve validating and reset fields', async () => {
                    await act(async () => {
                        const { container, getByText } = render(
                            <ApolloProvider client={mockClient}>
                                <PurchasePaymentForm {...props} />
                            </ApolloProvider>
                        );
                        fireEvent.change(container.querySelector('input#no')!, {
                            target: { value: 'no1', name: 'no' },
                        });
                        fireEvent.change(container.querySelector('textarea#description')!, {
                            target: { value: 'description1', name: 'description' },
                        });
                        fireEvent.submit(getByText('Save'));
                    });
                    expect(wrap.find('input#no').props().value).toEqual('');
                });
            });
        });

        describe('when formType is update', () => {
            beforeEach(async () => {
                props = { ...props, formType: 'update' };
                await act(async () => {
                    wrap = mount(
                        <ApolloProvider client={mockClient}>
                            <PurchasePaymentForm {...props} />
                        </ApolloProvider>
                    );
                });
            });

            it('should render form with data', () => {
                expect(wrap.find('ForwardRef(InternalForm)').exists()).toBeTruthy();
                expect(wrap.find('ForwardRef(InternalForm)').props().initialValues.no).toEqual(
                    mockInitialValues.no
                );
                expect(
                    moment(wrap.find('ForwardRef(InternalForm)').props().initialValues.date).format(
                        'YYYY-MM-DD'
                    )
                ).toEqual(mockInitialValues.date);
                expect(
                    wrap.find('ForwardRef(InternalForm)').props().initialValues.supplier
                ).toEqual(mockInitialValues.supplier);
                expect(
                    wrap.find('ForwardRef(InternalForm)').props().initialValues.payment_method
                ).toEqual(mockInitialValues.payment_method);
                expect(
                    wrap.find('ForwardRef(InternalForm)').props().initialValues.payment_no
                ).toEqual(mockInitialValues.payment_no);
                expect(
                    wrap.find('ForwardRef(InternalForm)').props().initialValues.description
                ).toEqual(mockInitialValues.description);
            });

            describe('when editing a data', () => {
                beforeEach(() => {
                    wrap.find('#TableAction-edit-id1').simulate('click');
                });

                it('should show modal data', () => {
                    expect(
                        wrap
                            .find('.ModalData')
                            .at(0)
                            .props().visible
                    ).toBeTruthy();
                });

                describe('when submit update data', () => {
                    beforeEach(() => {
                        wrap.find('button.ant-btn-primary')
                            .at(0)
                            .simulate('click');
                    });

                    it('should update data', () => {
                        expect(wrap.find('BodyRow').exists()).toBeTruthy();
                    });
                });

                describe('when cancel update data', () => {
                    beforeEach(() => {
                        wrap.find('button.ant-modal-close')
                            .at(0)
                            .simulate('click');
                    });

                    it('should update data', () => {
                        expect(
                            wrap
                                .find('.ModalData')
                                .at(0)
                                .props().visible
                        ).toBeFalsy();
                    });
                });
            });

            describe('when deleting a data', () => {
                beforeEach(() => {
                    wrap.find('#TableAction-delete-id1').simulate('click');
                    wrap.find('button.ant-btn-primary')
                        .at(0)
                        .simulate('click');
                });

                it('remove list data depend on id', () => {
                    expect(wrap.find('BodyRow').exists()).toBeFalsy();
                });
            });

            describe('when user submit form', () => {
                it('should reset fields match to initial values', async () => {
                    await act(async () => {
                        const { getByText } = render(
                            <ApolloProvider client={mockClient}>
                                <PurchasePaymentForm {...props} />
                            </ApolloProvider>
                        );

                        fireEvent.submit(getByText('Save'));
                    });

                    expect(wrap.find('ForwardRef(InternalForm)').props().initialValues.no).toEqual(
                        mockInitialValues.no
                    );
                    expect(
                        moment(
                            wrap.find('ForwardRef(InternalForm)').props().initialValues.date
                        ).format('YYYY-MM-DD')
                    ).toEqual(mockInitialValues.date);
                    expect(
                        wrap.find('ForwardRef(InternalForm)').props().initialValues.supplier
                    ).toEqual(mockInitialValues.supplier);
                    expect(
                        wrap.find('ForwardRef(InternalForm)').props().initialValues.payment_method
                    ).toEqual(mockInitialValues.payment_method);
                    expect(
                        wrap.find('ForwardRef(InternalForm)').props().initialValues.payment_no
                    ).toEqual(mockInitialValues.payment_no);
                    expect(
                        wrap.find('ForwardRef(InternalForm)').props().initialValues.description
                    ).toEqual(mockInitialValues.description);
                });
            });
        });
    });
});
