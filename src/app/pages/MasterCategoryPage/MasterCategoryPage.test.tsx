import { ApolloProvider } from '@apollo/react-hooks';
import { act } from '@testing-library/react';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { mount } from 'enzyme';
import { createMockClient } from 'mock-apollo-client';
import React from 'react';

import { resolvers } from 'src/core/graphql/resolvers';

import { CATEGORY_LIST } from 'src/shared/graphql/Category/schema.gql';

import { MasterCategoryPage } from './MasterCategoryPage';

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
    section: 'category',
    __typename: 'Crud',
};
cache.writeData({ data: { getCrud: crud } });
let mockClient = createMockClient({ cache, resolvers });
describe('MasterCategoryPage', () => {
    let wrap: any;
    let queryHandler = jest.fn().mockResolvedValue({
        data: {
            getCategoryList: {
                data: [
                    {
                        id: 'id1',
                        name: 'category1',
                        description: 'category1',
                        status: 'active',
                    },
                ],
                total: 1,
            },
        },
    });
    mockClient.setRequestHandler(CATEGORY_LIST, queryHandler);

    it('should render master category page and master card', async () => {
        await act(async () => {
            wrap = mount(
                <ApolloProvider client={mockClient}>
                    <MasterCategoryPage />
                </ApolloProvider>
            );
        });

        expect(wrap.find('MasterCategoryPage').exists()).toBeTruthy();
        expect(wrap.find('MasterCard').exists()).toBeTruthy();
    });

    describe('when data is loaded', () => {
        beforeEach(async () => {
            await act(async () => {
                wrap = mount(
                    <ApolloProvider client={mockClient}>
                        <MasterCategoryPage />
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
