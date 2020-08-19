import { ApolloProvider } from '@apollo/react-hooks';
import { act } from '@testing-library/react';
import { mount } from 'enzyme';
import { createMockClient } from 'mock-apollo-client';
import React from 'react';

import { MENUS } from 'src/shared/graphql/Menu/schema.gql';
import { GET_ACCESS_PERMISSIONS } from 'src/shared/graphql/Permission/schema.gql';
import { USER_BY_USERNAME } from 'src/shared/graphql/User/schema.gql';

import { Menu } from './Menu';

let mockClient = createMockClient();
let mockMenus = [
    {
        children: [
            {
                icon: 'medicine_box',
                id: '5f05d3e90503ec89562ccaad',
                key: 'Medicine',
                name: 'Medicine',
                status: 'Active',
                url: '/medicine',
            },
        ],
        icon: 'uom',
        id: '5f05d3e90503ec89562ccaac',
        key: 'Unit of Measurement',
        name: 'Unit of Measurement',
        status: 'Active',
        url: '/uom',
    },
];
let mockPermission = [
    {
        action: {
            name: 'Access',
        },
        id: 'id1',
        menu: {
            key: 'Unit of Measurement',
            name: 'Unit of Measurement',
        },
        status: 'active',
    },
    {
        action: {
            name: 'Access',
        },
        id: 'id2',
        menu: {
            key: 'Medicine',
            name: 'Medicine',
        },
        status: 'active',
    },
];
let mockUser = {
    id: 'id1',
    name: 'sa',
    role: {
        id: 'id1',
        name: 'role1',
    },
    username: 'sa',
};

describe('Menu', () => {
    let props = { auth: 'sa' };
    let wrap: any;
    let queryHandler = jest.fn().mockResolvedValue({ data: { getMenus: mockMenus } });
    let userQueryHandler = jest.fn().mockResolvedValue({ data: { getUserByUsername: mockUser } });
    let permissionQueryHandler = jest
        .fn()
        .mockResolvedValue({ data: { getAccessPermissionByRoleId: mockPermission } });
    mockClient.setRequestHandler(MENUS, queryHandler);
    mockClient.setRequestHandler(USER_BY_USERNAME, userQueryHandler);
    mockClient.setRequestHandler(GET_ACCESS_PERMISSIONS, permissionQueryHandler);

    it('should render menu', async () => {
        await act(async () => {
            wrap = mount(
                <ApolloProvider client={mockClient}>
                    <Menu {...props} />
                </ApolloProvider>
            );
        });

        expect(wrap.find('Memo(MenuPure)').exists()).toBeTruthy();
    });

    describe('when data is loaded', () => {
        beforeEach(async () => {
            await act(async () => {
                wrap = mount(
                    <ApolloProvider client={mockClient}>
                        <Menu {...props} />
                    </ApolloProvider>
                );
            });
        });

        it('should contains all Menu children', () => {
            expect(wrap.find('Menu').exists()).toBeTruthy();
            expect(wrap.find('SubMenu').exists()).toBeTruthy();
        });
    });
});
