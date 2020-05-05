import { ApolloProvider } from '@apollo/react-hooks';
import { act } from '@testing-library/react';
import { mount } from 'enzyme';
import { createMockClient } from 'mock-apollo-client';
import React from 'react';

import {
    CATEGORIES,
    deleteCategory,
    getCategories,
    updateManyCategory,
} from 'src/shared/graphql/Category/schema.gql';

import { MasterList } from '../MasterList';

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
let mockCategory = [
    {
        id: 'id1',
        name: 'category1',
        description: 'category1',
        status: 'active',
    },
];
let mockDataCategory = [
    {
        key: 'id1',
        name: 'category1',
        description: 'category1',
        status: 'active',
    },
];
describe('MasterList', () => {
    let wrap: any;
    let props = {
        action: 'list',
        columns: [
            {
                dataIndex: 'name',
                key: 'name',
                title: 'Name',
            },
            {
                dataIndex: 'description',
                key: 'description',
                title: 'Description',
            },
            {
                dataIndex: 'status',
                key: 'status',
                title: 'Status',
            },
        ],
        mutation: {
            delete: deleteCategory,
            update: updateManyCategory,
        },
        query: {
            data: getCategories,
            refetch: CATEGORIES,
        },
        handleData: jest.fn().mockImplementation(() => mockDataCategory),
        handleRecord: jest.fn(),
        handleResetAction: jest.fn(),
    };
    let queryHandler = jest.fn().mockResolvedValue({ data: { getCategories: mockCategory } });
    mockClient.setRequestHandler(CATEGORIES, queryHandler);
    const Component = ({ properties }: any) => (
        <ApolloProvider client={mockClient}>
            <MasterList {...properties} />
        </ApolloProvider>
    );
    it('should render user management', async () => {
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
