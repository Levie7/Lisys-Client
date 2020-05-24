import { ApolloProvider } from '@apollo/react-hooks';
import { act, fireEvent, render } from '@testing-library/react';
import { mount } from 'enzyme';
import { createMockClient } from 'mock-apollo-client';
import moment from 'moment';
import React from 'react';

import { SUPPLIERS } from '../MasterSupplierPage/schema.gql';
import { PurchaseListForm } from './PurchaseListForm';
import { PURCHASING_BY_ID } from './schema.gql';
import { MEDICINE_BY_QUERY, MEDICINE_LIST } from 'src/shared/graphql/Medicine/schema.gql';

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
    due_date: moment()
        .add(1, 'months')
        .format('YYYY-MM-DD'),
    supplier: 'id1',
    description: 'description1',
};
let mockSupplier = [
    {
        id: 'id1',
        name: 'category1',
        description: 'category1',
        status: 'active',
    },
    {
        id: 'id2',
        name: 'category2',
        description: 'category2',
        status: 'active',
    },
];
let mockMedicine = [
    {
        barcode: '123',
        buy_price: '2000',
        category: {
            id: 'id1',
            name: 'category1',
        },
        code: 'code1',
        id: 'id1',
        min_stock: 1,
        name: 'name1',
        sell_price: '2000',
        status: 'active',
        stock: 1,
        uom: {
            id: 'id1',
            name: 'uom1',
        },
        variant: {
            id: 'id1',
            name: 'variant1',
        },
    },
    {
        barcode: '321',
        buy_price: '2000',
        category: {
            id: 'id2',
            name: 'category2',
        },
        code: 'code2',
        id: 'id2',
        min_stock: 2,
        name: 'name2',
        sell_price: '2000',
        status: 'active',
        stock: 2,
        uom: {
            id: 'id2',
            name: 'uom2',
        },
        variant: {
            id: 'id2',
            name: 'variant2',
        },
    },
];
describe('PurchaseListForm', () => {
    let wrap: any;
    let props = {
        auth: 'username1',
        formType: 'update',
        recordKey: 'id1',
    };
    let queryHandler = jest.fn().mockResolvedValue({
        data: {
            getPurchasingById: {
                no: 'no1',
                date: moment(),
                description: 'description1',
                due_date: moment().add(1, 'months'),
                detail: [
                    {
                        batch_no: '',
                        buy_price: '2000',
                        expired_date: '2020-06-20',
                        id: 'id1',
                        medicine: {
                            id: 'id1',
                            code: 'code1',
                            name: 'Paramex',
                            uom: {
                                id: 'id1',
                                name: 'uom1',
                            },
                        },
                        qty: 1,
                        sell_price: '2000',
                        sub_total: '2000',
                    },
                ],
                id: 'id1',
                supplier: {
                    id: 'id1',
                    name: 'supplier1',
                },
                qty_total: 1,
                grand_total: '2000',
                credit_total: '2000',
            },
        },
    });
    let queryHandlerSupplier = jest
        .fn()
        .mockResolvedValue({ data: { getSuppliers: mockSupplier } });
    let queryHandlerMedicine = jest.fn().mockResolvedValue({
        data: {
            getMedicineList: {
                data: mockMedicine,
                total: 2,
            },
        },
    });
    mockClient.setRequestHandler(MEDICINE_LIST, queryHandlerMedicine);
    mockClient.setRequestHandler(SUPPLIERS, queryHandlerSupplier);
    mockClient.setRequestHandler(PURCHASING_BY_ID, queryHandler);

    it('should render master category page and master card', async () => {
        await act(async () => {
            wrap = mount(
                <ApolloProvider client={mockClient}>
                    <PurchaseListForm {...props} />
                </ApolloProvider>
            );
        });

        expect(wrap.find('PurchaseListForm').exists()).toBeTruthy();
    });

    describe('when data is loaded', () => {
        describe('when formType is create', () => {
            let initialUndefined: any;
            beforeEach(async () => {
                initialUndefined = {
                    no: undefined,
                    date: moment().format('YYYY-MM-DD'),
                    due_date: moment()
                        .add(1, 'months')
                        .format('YYYY-MM-DD'),
                    supplier: 'id1',
                    description: undefined,
                };
                props = { ...props, formType: 'create' };
                await act(async () => {
                    wrap = mount(
                        <ApolloProvider client={mockClient}>
                            <PurchaseListForm {...props} />
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
                    moment(
                        wrap.find('ForwardRef(InternalForm)').props().initialValues.due_date
                    ).format('YYYY-MM-DD')
                ).toEqual(initialUndefined.due_date);
                expect(
                    wrap.find('ForwardRef(InternalForm)').props().initialValues.supplier
                ).toEqual(initialUndefined.supplier);
                expect(
                    wrap.find('ForwardRef(InternalForm)').props().initialValues.description
                ).toEqual(initialUndefined.description);
            });

            describe('when entry medicine code and code is not exist', () => {
                beforeEach(async () => {
                    await act(async () => {
                        let queryHandlerMedicine = jest.fn().mockResolvedValue({
                            data: { getMedicineByQuery: null },
                        });
                        mockClient.setRequestHandler(MEDICINE_BY_QUERY, queryHandlerMedicine);
                        wrap = mount(
                            <ApolloProvider client={mockClient}>
                                <PurchaseListForm {...props} />
                            </ApolloProvider>
                        );
                        wrap.find('input.code').simulate('change', {
                            target: { name: 'code', value: 'code2' },
                        });
                        wrap.find('input.code').simulate('keydown', {
                            keyCode: 13,
                            which: 13,
                            charCode: 0,
                        });
                    });
                });
                it('should not showing modal data and reset field', () => {
                    expect(
                        wrap
                            .find('.ModalData')
                            .at(0)
                            .props().visible
                    ).toBeFalsy();
                    expect(wrap.find('input.code').props().value).toEqual('');
                });
            });

            describe('when entry data using list medicine', () => {
                beforeEach(() => {
                    wrap.find('button#List').simulate('click');
                });
                it('should show medicine list', () => {
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
                                <PurchaseListForm {...props} />
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
                            <PurchaseListForm {...props} />
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
                    moment(
                        wrap.find('ForwardRef(InternalForm)').props().initialValues.due_date
                    ).format('YYYY-MM-DD')
                ).toEqual(mockInitialValues.due_date);
                expect(
                    wrap.find('ForwardRef(InternalForm)').props().initialValues.supplier
                ).toEqual(mockInitialValues.supplier);
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
                                <PurchaseListForm {...props} />
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
                        moment(
                            wrap.find('ForwardRef(InternalForm)').props().initialValues.due_date
                        ).format('YYYY-MM-DD')
                    ).toEqual(mockInitialValues.due_date);
                    expect(
                        wrap.find('ForwardRef(InternalForm)').props().initialValues.supplier
                    ).toEqual(mockInitialValues.supplier);
                    expect(
                        wrap.find('ForwardRef(InternalForm)').props().initialValues.description
                    ).toEqual(mockInitialValues.description);
                });
            });
        });
    });
});
