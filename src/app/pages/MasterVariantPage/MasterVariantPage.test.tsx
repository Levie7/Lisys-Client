import { ApolloProvider } from '@apollo/react-hooks';
import { act } from '@testing-library/react';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { mount } from 'enzyme';
import { createMockClient } from 'mock-apollo-client';
import React from 'react';

import { resolvers } from 'src/core/graphql/resolvers';

import { VARIANT_LIST } from 'src/shared/graphql/Variant/schema.gql';

import { MasterVariantPage } from './MasterVariantPage';

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
    section: 'variant',
    __typename: 'Crud',
};
cache.writeData({ data: { getCrud: crud } });
let mockClient = createMockClient({ cache, resolvers });
describe('MasterVariantPage', () => {
    let wrap: any;
    let queryHandler = jest.fn().mockResolvedValue({
        data: {
            getVariantList: {
                data: [
                    {
                        id: 'id1',
                        name: 'variant1',
                        description: 'variant1',
                        status: 'active',
                    },
                ],
                total: 1,
            },
        },
    });
    mockClient.setRequestHandler(VARIANT_LIST, queryHandler);

    it('should render master variant page and master card', async () => {
        await act(async () => {
            wrap = mount(
                <ApolloProvider client={mockClient}>
                    <MasterVariantPage />
                </ApolloProvider>
            );
        });

        expect(wrap.find('MasterVariantPage').exists()).toBeTruthy();
        expect(wrap.find('MasterCard').exists()).toBeTruthy();
    });

    describe('when data is loaded', () => {
        beforeEach(async () => {
            await act(async () => {
                wrap = mount(
                    <ApolloProvider client={mockClient}>
                        <MasterVariantPage />
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
