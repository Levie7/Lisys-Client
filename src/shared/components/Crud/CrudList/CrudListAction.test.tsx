import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { mount } from 'enzyme';
import { createMockClient } from 'mock-apollo-client';
import React from 'react';

import { resolvers } from 'src/core/graphql/resolvers';

import { CrudListAction, CrudListActionProps } from './CrudListAction';

const cache = new InMemoryCache();
let crud = {
    action: 'list',
    section: 'category',
    __typename: 'Crud',
};
cache.writeData({ data: { getCrud: crud } });
let mockClient = createMockClient({ cache, resolvers });
describe('CrudListAction', () => {
    let wrap: any;
    const props: CrudListActionProps = {
        crud: {
            action: 'create',
            section: 'category',
            __typename: 'Crud',
        },
        lang: 'en',
        showAction: true,
        showBack: false,
    };

    it('should render CrudListAction', () => {
        wrap = mount(
            <ApolloProvider client={mockClient}>
                <CrudListAction {...props} />
            </ApolloProvider>
        );
        expect(wrap.find('Memo(CrudListActionPure)').exists()).toBeTruthy();
    });
});
