import { ApolloProvider } from '@apollo/react-hooks';
import { act } from '@testing-library/react';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { mount } from 'enzyme';
import { createMockClient } from 'mock-apollo-client';
import React from 'react';

import { resolvers } from 'src/core/graphql/resolvers';

import { UOM_LIST } from 'src/shared/graphql/UoM/schema.gql';

import { MasterUoMPage } from './MasterUoMPage';

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
    section: 'uom',
    __typename: 'Crud',
};
cache.writeData({ data: { getCrud: crud } });
let mockClient = createMockClient({ cache, resolvers });
describe('MasterUoMPage', () => {
    let wrap: any;
    let queryHandler = jest.fn().mockResolvedValue({
        data: {
            getUoMList: {
                data: [
                    {
                        id: 'id1',
                        name: 'uom1',
                        description: 'uom1',
                        status: 'active',
                    },
                ],
                total: 1,
            },
        },
    });
    mockClient.setRequestHandler(UOM_LIST, queryHandler);

    it('should render master uom page and master card', async () => {
        await act(async () => {
            wrap = mount(
                <ApolloProvider client={mockClient}>
                    <MasterUoMPage />
                </ApolloProvider>
            );
        });

        expect(wrap.find('MasterUoMPage').exists()).toBeTruthy();
        expect(wrap.find('MasterCard').exists()).toBeTruthy();
    });

    describe('when data is loaded', () => {
        beforeEach(async () => {
            await act(async () => {
                wrap = mount(
                    <ApolloProvider client={mockClient}>
                        <MasterUoMPage />
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
