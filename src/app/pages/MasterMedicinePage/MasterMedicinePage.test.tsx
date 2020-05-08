import { ApolloProvider } from '@apollo/react-hooks';
import { act } from '@testing-library/react';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { mount } from 'enzyme';
import { createMockClient } from 'mock-apollo-client';
import React from 'react';

import { resolvers } from 'src/core/graphql/resolvers';

import { MasterMedicinePage } from './MasterMedicinePage';
import { MEDICINE_LIST } from './schema.gql';

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
const cache = new InMemoryCache();
let crud = {
    action: 'list',
    section: 'medicine',
    __typename: 'Crud',
};
cache.writeData({ data: { getCrud: crud } });
let mockClient = createMockClient({ cache, resolvers });
describe('MasterMedicinePage', () => {
    let wrap: any;
    let queryHandler = jest.fn().mockResolvedValue({
        data: {
            getMedicineList: {
                data: [
                    {
                        id: 'id1',
                        barcode: '123',
                        buy_price: '123',
                        category: {
                            name: 'category1',
                        },
                        code: 'code1',
                        min_stock: '1',
                        name: 'name1',
                        sell_price: '123',
                        status: 'active',
                        stock: '1',
                        uom: {
                            name: 'uom1',
                        },
                        variant: {
                            name: 'variant1',
                        },
                    },
                ],
                total: 1,
            },
        },
    });
    mockClient.setRequestHandler(MEDICINE_LIST, queryHandler);

    it('should render master medicine page and master card', async () => {
        await act(async () => {
            wrap = mount(
                <ApolloProvider client={mockClient}>
                    <MasterMedicinePage />
                </ApolloProvider>
            );
        });

        expect(wrap.find('MasterMedicinePage').exists()).toBeTruthy();
        expect(wrap.find('MasterCard').exists()).toBeTruthy();
    });

    describe('when data is loaded', () => {
        beforeEach(async () => {
            await act(async () => {
                wrap = mount(
                    <ApolloProvider client={mockClient}>
                        <MasterMedicinePage />
                    </ApolloProvider>
                );
            });
        });

        it('should list with data', () => {
            // expect(wrap.find('BodyRow').exists()).toBeTruthy();
            // expect(wrap.find('BodyRow').props().rowKey).toEqual('id1');
            // console.log(wrap.debug());
        });
    });
});
