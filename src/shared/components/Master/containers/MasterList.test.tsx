import { ApolloProvider } from '@apollo/react-hooks';
import { act } from '@testing-library/react';
import { mount } from 'enzyme';
import { createMockClient } from 'mock-apollo-client';
import React from 'react';

import {
    CATEGORY_LIST,
    deleteCategory,
    getCategoryById,
    getCategoryList,
    updateManyCategory,
} from 'src/shared/graphql/Category/schema.gql';
import {
    GET_CREATE_PERMISSIONS,
    GET_DELETE_PERMISSIONS,
    GET_READ_PERMISSIONS,
    GET_UPDATE_PERMISSIONS,
} from 'src/shared/graphql/Permission/schema.gql';
import { USER_BY_USERNAME } from 'src/shared/graphql/User/schema.gql';

import { MasterList, MasterListProps } from './MasterList';
import { mockCategory } from './mocks/mockData';

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
let mockClient = createMockClient();
let mockDataCategory = {
    list: mockCategory,
    total: 11,
};
let mockPermission = [
    {
        action: {
            name: 'Delete',
        },
        id: 'id1',
        menu: {
            key: 'Category',
            name: 'Category',
        },
        status: 'active',
    },
    {
        action: {
            name: 'Access',
        },
        id: 'id2',
        menu: {
            key: 'Category',
            name: 'Category',
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
describe('MasterList', () => {
    let wrap: any;
    let props: MasterListProps = {
        action: 'list',
        auth: 'sa',
        columns: [
            {
                dataIndex: 'name',
                key: 'name',
                title: { en: 'Name', id: 'Nama' },
            },
            {
                dataIndex: 'description',
                key: 'description',
                title: { en: 'Description', id: 'Deskripsi' },
            },
            {
                dataIndex: 'status',
                key: 'status',
                title: { en: 'Status', id: 'Status' },
            },
        ],
        lang: 'en',
        module: 'Master',
        mutation: {
            delete: deleteCategory,
            update: updateManyCategory,
        },
        query: {
            list: getCategoryList,
            read: getCategoryById,
            refetch: CATEGORY_LIST,
        },
        title: 'Category',
        handleData: jest.fn().mockImplementation(() => mockDataCategory),
        handleReadData: jest.fn(),
        handleRecord: jest.fn(),
        handleResetAction: jest.fn(),
        handleShowCreate: jest.fn(),
    };
    let queryHandler = jest
        .fn()
        .mockResolvedValue({ data: { getCategoryList: { data: mockCategory, total: 11 } } });
    let userQueryHandler = jest.fn().mockResolvedValue({ data: { getUserByUsername: mockUser } });
    let permissionCreateQueryHandler = jest
        .fn()
        .mockResolvedValue({ data: { getCreatePermissionByRoleId: mockPermission } });
    let permissionDeleteQueryHandler = jest
        .fn()
        .mockResolvedValue({ data: { getDeletePermissionByRoleId: mockPermission } });
    let permissionReadQueryHandler = jest
        .fn()
        .mockResolvedValue({ data: { getReadPermissionByRoleId: mockPermission } });
    let permissionUpdateQueryHandler = jest
        .fn()
        .mockResolvedValue({ data: { getUpdatePermissionByRoleId: mockPermission } });
    mockClient.setRequestHandler(CATEGORY_LIST, queryHandler);
    mockClient.setRequestHandler(USER_BY_USERNAME, userQueryHandler);
    mockClient.setRequestHandler(GET_CREATE_PERMISSIONS, permissionCreateQueryHandler);
    mockClient.setRequestHandler(GET_DELETE_PERMISSIONS, permissionDeleteQueryHandler);
    mockClient.setRequestHandler(GET_READ_PERMISSIONS, permissionReadQueryHandler);
    mockClient.setRequestHandler(GET_UPDATE_PERMISSIONS, permissionUpdateQueryHandler);
    const Component = ({ properties }: any) => (
        <ApolloProvider client={mockClient}>
            <MasterList {...properties} />
        </ApolloProvider>
    );
    it('should render master list', async () => {
        await act(async () => {
            wrap = mount(<Component properties={props} />);
        });
        expect(wrap.find('MasterList').exists()).toBeTruthy();
    });

    describe('when data is loaded', () => {
        beforeEach(async () => {
            await act(async () => {
                wrap = mount(<Component properties={props} />);
            });
        });

        it('should render crud list table', () => {
            expect(wrap.find('Memo(CrudListTablePure)').exists()).toBeTruthy();
        });

        // describe('when give action to selected data', () => {
        //     beforeEach(async () => {
        //         // await act(async () => {
        //         props = { ...props, action: 'inactive' };
        //         wrap.find('input.ant-checkbox-input')
        //             .at(1)
        //             .simulate('change', {
        //                 target: { checked: true },
        //             });
        //         wrap.setProps({ properties: props });
        //         console.log(wrap.find('MasterList').props());
        //         // });
        //     });

        //     it('should call reset action', () => {
        //         expect(wrap.find('MasterList').props().handleResetAction).toHaveBeenCalled();
        //     });
        // });

        describe('when action is active', () => {
            beforeEach(async () => {
                props = { ...props, action: 'active' };
                await act(async () => {
                    wrap = mount(<Component properties={props} />);
                });
            });
            test('if doesnt have selected item should call reset action', () => {
                expect(wrap.find('MasterList').props().handleResetAction).toHaveBeenCalled();
            });
        });

        describe('when change page 2', () => {
            beforeEach(() => {
                wrap.update();
                wrap.find('.ant-pagination-item-2').simulate('click');
            });
            it('should set current page to 2', () => {
                expect(wrap.find('Memo(CrudListTablePure)').props().pagination.current).toEqual(2);
            });
        });

        describe('when search', () => {
            beforeEach(() => {
                wrap.find('input#Search').simulate('change', {
                    target: { name: 'search', value: 'medicine' },
                });
                wrap.find('input#Search').simulate('keydown', {
                    keyCode: 13,
                    which: 13,
                    charCode: 0,
                });
            });
            it('should reset page to 1', () => {
                expect(wrap.find('Memo(CrudListTablePure)').props().pagination.current).toEqual(1);
            });
        });

        describe('when deleting a data', () => {
            beforeEach(() => {
                wrap.find('#TableAction-delete-id1').simulate('click');
                wrap.find('button.ant-btn-primary').simulate('click');
            });

            it('remove list data depend on id', () => {
                expect(wrap.find('BodyRow').exists()).toBeFalsy();
            });
        });
    });
});
