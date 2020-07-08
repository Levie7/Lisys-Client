import { ApolloProvider } from '@apollo/react-hooks';
import { act, fireEvent, render } from '@testing-library/react';
import { mount } from 'enzyme';
import { createMockClient } from 'mock-apollo-client';
import moment from 'moment';
import React from 'react';

import { MEDICINE_BY_QUERY, MEDICINE_LIST } from 'src/shared/graphql/Medicine/schema.gql';

import { StockOpnameForm } from './StockOpnameForm';

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
describe('StockOpnameForm', () => {
    let wrap: any;
    let props = {
        auth: 'username1',
        formType: 'update',
        recordKey: 'id1',
    };
    let queryHandlerMedicine = jest.fn().mockResolvedValue({
        data: {
            getMedicineList: {
                data: mockMedicine,
                total: 2,
            },
        },
    });
    let queryHandlerMedicineQuery = jest.fn().mockResolvedValue({
        data: { getMedicineByQuery: null },
    });
    mockClient.setRequestHandler(MEDICINE_BY_QUERY, queryHandlerMedicineQuery);
    mockClient.setRequestHandler(MEDICINE_LIST, queryHandlerMedicine);

    it('should render stock opname form', async () => {
        await act(async () => {
            wrap = mount(
                <ApolloProvider client={mockClient}>
                    <StockOpnameForm {...props} />
                </ApolloProvider>
            );
        });

        expect(wrap.find('StockOpnameForm').exists()).toBeTruthy();
    });

    describe('when data is loaded', () => {
        describe('when formType is create', () => {
            let initialUndefined: any;
            beforeEach(async () => {
                initialUndefined = { date: moment().format('YYYY-MM-DD') };
                props = { ...props, formType: 'create' };
                await act(async () => {
                    wrap = mount(
                        <ApolloProvider client={mockClient}>
                            <StockOpnameForm {...props} />
                        </ApolloProvider>
                    );
                });
            });

            it('should render form with empty data', () => {
                expect(wrap.find('ForwardRef(InternalForm)').exists()).toBeTruthy();
                expect(
                    moment(wrap.find('ForwardRef(InternalForm)').props().initialValues.date).format(
                        'YYYY-MM-DD'
                    )
                ).toEqual(initialUndefined.date);
            });

            describe('when entry medicine code and code is not exist', () => {
                beforeEach(async () => {
                    await act(async () => {
                        wrap = mount(
                            <ApolloProvider client={mockClient}>
                                <StockOpnameForm {...props} />
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
                                <StockOpnameForm {...props} />
                            </ApolloProvider>
                        );
                        fireEvent.change(container.querySelector('textarea#description')!, {
                            target: { value: 'description1', name: 'description' },
                        });
                        fireEvent.submit(getByText('Save'));
                    });
                    expect(wrap.find('textarea#description').props().value).toEqual('');
                });
            });
        });
    });
});
