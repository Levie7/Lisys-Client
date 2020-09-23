import { ApolloProvider } from '@apollo/react-hooks';
import { act, fireEvent, render } from '@testing-library/react';
import { mount } from 'enzyme';
import { createMockClient } from 'mock-apollo-client';
import moment from 'moment';
import React from 'react';

import { SALES_LIST } from 'src/shared/graphql/Sales/schema.gql';

import { SalesReturnForm, SalesReturnFormProps } from './SalesReturnForm';
import { SALES_RETURN_BY_ID } from './schema.gql';

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
    description: 'description1',
};
let mockSales = [
    {
        change_total: 3000,
        date: moment().format('YYYY-MM-DD'),
        description: '',
        detail: [
            {
                medicine: {
                    code: 'code1',
                    id: 'id1',
                    name: 'medicine1',
                    uom: {
                        id: 'id1',
                        name: 'uom1',
                    },
                },
                qty: 1,
                sell_price: 2000,
                sub_total: 2000,
            },
        ],
        id: 'id1',
        grand_total: 2000,
        no: 'no1',
        payment_total: 5000,
        qty_total: 1,
        status: 'active',
        updated_by: {
            id: 'id1',
            name: 'name1',
        },
    },
    {
        change_total: 3000,
        date: moment().format('YYYY-MM-DD'),
        description: '',
        detail: [
            {
                medicine: {
                    code: 'code1',
                    id: 'id1',
                    name: 'medicine1',
                    uom: {
                        id: 'id1',
                        name: 'uom1',
                    },
                },
                qty: 1,
                sell_price: 2000,
                sub_total: 2000,
            },
        ],
        id: 'id2',
        grand_total: 2000,
        no: 'no2',
        payment_total: 5000,
        qty_total: 1,
        status: 'active',
        updated_by: {
            id: 'id1',
            name: 'name1',
        },
    },
];
describe('SalesReturnForm', () => {
    let wrap: any;
    let props: SalesReturnFormProps = {
        auth: 'username1',
        formType: 'update',
        lang: 'en',
        recordKey: 'id1',
    };
    let queryHandler = jest.fn().mockResolvedValue({
        data: {
            getSalesReturnById: {
                date: moment(),
                description: 'description1',
                detail: [
                    {
                        id: 'id1',
                        medicine: {
                            code: 'code1',
                            id: 'id1',
                            name: 'medicine1',
                            uom: {
                                id: 'id1',
                                name: 'uom1',
                            },
                        },
                        sales: {
                            id: 'id1',
                            no: 'no1',
                        },
                        qty: 1,
                        qty_sell: 1,
                        sell_price: 2000,
                        sub_total: 2000,
                    },
                ],
                grand_total: 2000,
                id: 'id1',
                no: 'no1',
                qty_total: 1,
            },
        },
    });
    let queryHandlerSales = jest.fn().mockResolvedValue({
        data: {
            getSalesList: {
                data: mockSales,
                total: 2,
            },
        },
    });
    mockClient.setRequestHandler(SALES_LIST, queryHandlerSales);
    mockClient.setRequestHandler(SALES_RETURN_BY_ID, queryHandler);

    it('should render master category page and master card', async () => {
        await act(async () => {
            wrap = mount(
                <ApolloProvider client={mockClient}>
                    <SalesReturnForm {...props} />
                </ApolloProvider>
            );
        });

        expect(wrap.find('SalesReturnForm').exists()).toBeTruthy();
    });

    describe('when data is loaded', () => {
        describe('when formType is create', () => {
            let initialUndefined: any;
            beforeEach(async () => {
                initialUndefined = {
                    no: undefined,
                    date: moment().format('YYYY-MM-DD'),
                    description: undefined,
                };
                props = { ...props, formType: 'create' };
                await act(async () => {
                    wrap = mount(
                        <ApolloProvider client={mockClient}>
                            <SalesReturnForm {...props} />
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
                    wrap.find('ForwardRef(InternalForm)').props().initialValues.description
                ).toEqual(initialUndefined.description);
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
                                <SalesReturnForm {...props} />
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
                            <SalesReturnForm {...props} />
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
                    wrap.find('ForwardRef(InternalForm)').props().initialValues.description
                ).toEqual(mockInitialValues.description);
            });

            describe('when editing a data', () => {
                beforeEach(() => {
                    wrap.find('#TableAction-edit-id1-id1').simulate('click');
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
                    wrap.find('#TableAction-delete-id1-id1').simulate('click');
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
                                <SalesReturnForm {...props} />
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
                        wrap.find('ForwardRef(InternalForm)').props().initialValues.description
                    ).toEqual(mockInitialValues.description);
                });
            });
        });
    });
});
