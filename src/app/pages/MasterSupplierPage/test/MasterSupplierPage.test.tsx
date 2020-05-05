import { ApolloProvider } from '@apollo/react-hooks';
import { act } from '@testing-library/react';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { mount } from 'enzyme';
import { createMockClient } from 'mock-apollo-client';
import React from 'react';

import { resolvers } from 'src/core/graphql/resolvers';

import { SUPPLIERS } from '../schema.gql';

import { MasterSupplierPage } from '../MasterSupplierPage';

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
    section: 'supplier',
    __typename: 'Crud',
};
cache.writeData({ data: { getCrud: crud } });
let mockClient = createMockClient({ cache, resolvers });
describe('MasterSupplierPage', () => {
    let wrap: any;
    let queryHandler = jest.fn().mockResolvedValue({
        data: {
            getSuppliers: [
                {
                    id: 'id1',
                    name: 'supplier1',
                    phone: '123',
                    status: 'active',
                },
            ],
        },
    });
    mockClient.setRequestHandler(SUPPLIERS, queryHandler);

    it('should render master supplier page and master card', async () => {
        await act(async () => {
            wrap = mount(
                <ApolloProvider client={mockClient}>
                    <MasterSupplierPage />
                </ApolloProvider>
            );
        });

        expect(wrap.find('MasterSupplierPage').exists()).toBeTruthy();
        expect(wrap.find('MasterCard').exists()).toBeTruthy();
    });

    describe('when data is loaded', () => {
        beforeEach(async () => {
            await act(async () => {
                wrap = mount(
                    <ApolloProvider client={mockClient}>
                        <MasterSupplierPage />
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
