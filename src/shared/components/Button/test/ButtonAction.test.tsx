import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { mount, shallow } from 'enzyme';
import { createMockClient } from 'mock-apollo-client';
import React from 'react';

import { resolvers } from 'src/core/graphql/resolvers';
import { Crud as CrudType } from 'src/core/graphql/types';

import { ButtonType } from '../Button';
import { ButtonAction } from '../ButtonAction';

const cache = new InMemoryCache();
let crud = {
    action: 'list',
    section: 'category',
    __typename: 'Crud',
};
cache.writeData({ data: { getCrud: crud } });
let mockClient = createMockClient({ cache, resolvers });
describe('ButtonAction', () => {
    let wrap: any;
    let props: { buttonType: ButtonType; crud: CrudType; iconType?: string; title: string } = {
        buttonType: 'default',
        iconType: 'update',
        title: 'Button',
        crud: {
            action: 'create',
            section: 'category',
            __typename: 'Crud',
        },
    };
    it('should render button action', () => {
        wrap = mount(
            <ApolloProvider client={mockClient}>
                <ButtonAction {...props} />
            </ApolloProvider>
        );
        expect(wrap.find('ButtonAction').exists()).toBeTruthy();
    });

    describe('when click button default', () => {
        beforeEach(() => {
            wrap.find('button#ButtonActionDefault').simulate('click');
        });
        it('should update cache data', () => {
            expect(wrap.find('ApolloProvider').props().client.cache.data).toEqual(cache.data);
        });
    });

    describe('when click button action', () => {
        beforeEach(() => {
            props = { ...props, crud: { ...crud, action: 'action' } };
            wrap = mount(
                <ApolloProvider client={mockClient}>
                    <ButtonAction {...props} />
                </ApolloProvider>
            );
            const dropdown = wrap.find('Dropdown');
            const submenu = shallow(<div>{dropdown.prop('overlay')}</div>);
            const submenuItems = submenu.find('Menu');
            submenuItems.simulate('click', { key: 'active' });
        });
        it('should update cache data', () => {
            expect(wrap.find('ApolloProvider').props().client.cache.data).toEqual(cache.data);
        });
    });
});
