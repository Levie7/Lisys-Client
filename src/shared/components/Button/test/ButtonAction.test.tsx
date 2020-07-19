import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { mount, shallow } from 'enzyme';
import { createMockClient } from 'mock-apollo-client';
import React from 'react';

import { resolvers } from 'src/core/graphql/resolvers';

import { ButtonAction, ButtonActionProps } from '../ButtonAction';

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
    let props: ButtonActionProps = {
        buttonType: 'default',
        iconType: 'update',
        lang: 'en',
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
