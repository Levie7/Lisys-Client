import { ApolloProvider } from '@apollo/react-hooks';
import { act } from '@testing-library/react';
import { mount } from 'enzyme';
import { createMockClient } from 'mock-apollo-client';
import React from 'react';

import { MENUS } from 'src/shared/graphql/Menu/schema.gql';
import { ACTIONS, PERMISSIONS } from 'src/shared/graphql/Permission/schema.gql';

import { ROLES } from '../Role/schema.gql';

import { PermissionList, PermissionListProps } from './PermissionList';

let mockClient = createMockClient();
let mockPermission = [
    {
        action: {
            name: 'name1',
        },
        id: 'id1',
        menu: {
            key: 'name1',
            name: 'name1',
        },
        status: 'active',
    },
    {
        action: {
            name: 'name2',
        },
        id: 'id2',
        menu: {
            key: 'name2',
            name: 'name2',
        },
        status: 'active',
    },
];
let mockAction = [
    {
        id: 'id1',
        name: 'name1',
    },
    {
        id: 'id2',
        name: 'name2',
    },
];
let mockMenu = [
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
let mockRole = [
    {
        key: 'id1',
        id: 'id1',
        name: 'role1',
        description: 'role1',
        status: 'active',
    },
    {
        key: 'id2',
        id: 'id2',
        name: 'role2',
        description: 'role2',
        status: 'active',
    },
];
describe('PermissionList', () => {
    let wrap: any;
    let props: PermissionListProps = { lang: 'en' };
    let queryHandler = jest
        .fn()
        .mockResolvedValue({ data: { getPermissionsByRoleId: mockPermission } });
    let actionQueryHandler = jest.fn().mockResolvedValue({ data: { getActions: mockAction } });
    let menuQueryHandler = jest.fn().mockResolvedValue({ data: { getMenus: mockMenu } });
    let roleQueryHandler = jest.fn().mockResolvedValue({ data: { getRoles: mockRole } });
    mockClient.setRequestHandler(ACTIONS, actionQueryHandler);
    mockClient.setRequestHandler(MENUS, menuQueryHandler);
    mockClient.setRequestHandler(ROLES, roleQueryHandler);
    mockClient.setRequestHandler(PERMISSIONS, queryHandler);

    it('should render permission list', async () => {
        await act(async () => {
            wrap = mount(
                <ApolloProvider client={mockClient}>
                    <PermissionList {...props} />
                </ApolloProvider>
            );
        });

        expect(wrap.find('PermissionList').exists()).toBeTruthy();
    });

    describe('when data is loaded', () => {
        beforeEach(async () => {
            await act(async () => {
                wrap = mount(
                    <ApolloProvider client={mockClient}>
                        <PermissionList {...props} />
                    </ApolloProvider>
                );
            });
        });

        it('should render crud list table', () => {
            expect(wrap.find('Memo(CrudListTablePure)').exists()).toBeTruthy();
        });
    });
});
