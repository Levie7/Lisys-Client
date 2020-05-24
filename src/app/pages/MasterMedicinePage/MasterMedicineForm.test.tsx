import { ApolloProvider } from '@apollo/react-hooks';
import { act, fireEvent, render } from '@testing-library/react';
import { mount } from 'enzyme';
import { createMockClient } from 'mock-apollo-client';
import React from 'react';

import { CATEGORIES } from 'src/shared/graphql/Category/schema.gql';
import { MEDICINE_BY_QUERY } from 'src/shared/graphql/Medicine/schema.gql';
import { UOMS } from 'src/shared/graphql/UoM/schema.gql';
import { VARIANTS } from 'src/shared/graphql/Variant/schema.gql';

import { MasterMedicineForm } from './MasterMedicineForm';

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
    barcode: '123',
    buy_price: '123',
    category: 'id1',
    code: 'code1',
    key: 'id1',
    min_stock: '1',
    name: 'name1',
    percentage: '0',
    sell_price: '123',
    stock: '1',
    uom: 'id1',
    variant: 'id1',
};
let mockCategory = [
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
let mockUoM = [
    {
        id: 'id1',
        name: 'uom1',
        description: 'uom1',
        status: 'active',
    },
    {
        id: 'id2',
        name: 'uom2',
        description: 'uom2',
        status: 'active',
    },
];
let mockVariant = [
    {
        id: 'id1',
        name: 'variant1',
        description: 'variant1',
        status: 'active',
    },
    {
        id: 'id2',
        name: 'variant2',
        description: 'variant2',
        status: 'active',
    },
];
describe('MasterMedicineForm', () => {
    let wrap: any;
    let props = {
        auth: 'username1',
        formType: 'update',
        recordKey: 'id1',
    };
    let queryHandler = jest.fn().mockResolvedValue({
        data: {
            getMedicineByQuery: {
                barcode: '123',
                buy_price: '123',
                category: {
                    id: 'id1',
                    name: 'category1',
                },
                code: 'code1',
                id: 'id1',
                min_stock: '1',
                name: 'name1',
                sell_price: '123',
                status: 'active',
                stock: '1',
                uom: {
                    id: 'id1',
                    name: 'uom1',
                },
                variant: {
                    id: 'id1',
                    name: 'variant1',
                },
            },
        },
    });
    let queryHandlerCategory = jest
        .fn()
        .mockResolvedValue({ data: { getCategories: mockCategory } });
    let queryHandlerUoM = jest.fn().mockResolvedValue({ data: { getUoMs: mockUoM } });
    let queryHandlerVariant = jest.fn().mockResolvedValue({ data: { getVariants: mockVariant } });
    mockClient.setRequestHandler(VARIANTS, queryHandlerVariant);
    mockClient.setRequestHandler(UOMS, queryHandlerUoM);
    mockClient.setRequestHandler(CATEGORIES, queryHandlerCategory);
    mockClient.setRequestHandler(MEDICINE_BY_QUERY, queryHandler);

    it('should render master medicine page and master card', async () => {
        await act(async () => {
            wrap = mount(
                <ApolloProvider client={mockClient}>
                    <MasterMedicineForm {...props} />
                </ApolloProvider>
            );
        });

        expect(wrap.find('MasterMedicineForm').exists()).toBeTruthy();
    });

    describe('when data is loaded', () => {
        describe('when formType is create', () => {
            let initialUndefined: any;
            beforeEach(async () => {
                initialUndefined = {
                    barcode: undefined,
                    buy_price: undefined,
                    category: 'id1',
                    code: undefined,
                    key: undefined,
                    min_stock: undefined,
                    name: undefined,
                    sell_price: undefined,
                    stock: undefined,
                    uom: 'id1',
                    variant: 'id1',
                };
                props = { ...props, formType: 'create' };
                await act(async () => {
                    wrap = mount(
                        <ApolloProvider client={mockClient}>
                            <MasterMedicineForm {...props} />
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

            describe('when user change percentage', () => {
                describe('when buy price is empty', () => {
                    const validator = jest.fn().mockImplementation(() => {
                        wrap.find('input#buy_price').simulate('change', {
                            target: { value: undefined },
                        });
                        wrap.find('input#percentage').simulate('change', {
                            target: { value: 10 },
                        });
                        return Promise.reject('Please fill the buy price first');
                    });

                    test('should validate field and return message fill buy price first', async () => {
                        return expect(validator()).rejects.toMatch(
                            'Please fill the buy price first'
                        );
                    });
                });
                describe('when buy price is not empty', () => {
                    const validator = jest.fn().mockImplementation(() => {
                        wrap.find('input#buy_price').simulate('change', {
                            target: { name: 'buy_price', value: 10000 },
                        });
                        wrap.find('input#percentage').simulate('change', {
                            target: { name: 'percentage', value: 10 },
                        });
                        wrap.find('input#sell_price').simulate('change', {
                            target: { name: 'sell_price', value: 11000 },
                        });

                        return wrap.find('input#percentage').props().value;
                    });

                    test('should validate field and resolved', async () => {
                        expect(validator()).toEqual(wrap.find('input#percentage').props().value);
                    });
                });
            });

            describe('when user change sell price', () => {
                const validator = jest.fn().mockImplementation(() => {
                    wrap.find('input#buy_price').simulate('change', {
                        target: { value: undefined },
                    });
                    wrap.find('input#sell_price').simulate('change', {
                        target: { value: 10000 },
                    });
                    return Promise.reject('Please fill the buy price first');
                });

                test('should validate field and return message fill buy price first', async () => {
                    return expect(validator()).rejects.toMatch('Please fill the buy price first');
                });
            });

            describe('when user submit form', () => {
                test('should resolve validating and reset fields', async () => {
                    await act(async () => {
                        const { container, getByText } = render(
                            <ApolloProvider client={mockClient}>
                                <MasterMedicineForm {...props} />
                            </ApolloProvider>
                        );
                        fireEvent.change(container.querySelector('input#code')!, {
                            target: { value: 'code1', name: 'code' },
                        });
                        fireEvent.change(container.querySelector('input#name')!, {
                            target: { value: 'name1', name: 'name' },
                        });
                        fireEvent.change(container.querySelector('input#buy_price')!, {
                            target: { value: '123', name: 'buy_price' },
                        });
                        fireEvent.change(container.querySelector('input#sell_price')!, {
                            target: { value: '123', name: 'sell_price' },
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
                            <MasterMedicineForm {...props} />
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
                                <MasterMedicineForm {...props} />
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
