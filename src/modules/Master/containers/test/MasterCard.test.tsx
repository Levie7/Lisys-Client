import { ApolloProvider } from '@apollo/react-hooks';
import { act } from '@testing-library/react';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { mount } from 'enzyme';
import { createMockClient } from 'mock-apollo-client';
import React from 'react';

import { CRUD } from 'src/core/graphql/crud';
import { resolvers } from 'src/core/graphql/resolvers';

import { MasterCard } from '../MasterCard';

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
    section: 'master',
    __typename: 'Crud',
};
cache.writeData({ data: { getCrud: crud } });
let mockClient = createMockClient({ cache, resolvers });
describe('MasterCard', () => {
    let wrap: any;
    let children = jest.fn();
    let props = {
        children,
        header: {
            link: '/variant',
            title: 'Variant',
        },
        initSection: 'variant',
    };
    let queryHandler = jest.fn().mockResolvedValue({ data: { getCrud: crud } });
    mockClient.setRequestHandler(CRUD, queryHandler);
    it('should render user management', async () => {
        await act(async () => {
            wrap = mount(
                <ApolloProvider client={mockClient}>
                    <MasterCard {...props} />
                </ApolloProvider>
            );
        });
        expect(wrap.find('MasterCard').exists()).toBeTruthy();
    });
});
