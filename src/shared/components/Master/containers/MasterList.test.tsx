import { ApolloProvider } from '@apollo/react-hooks';
import { act } from '@testing-library/react';
import { mount } from 'enzyme';
import { createMockClient } from 'mock-apollo-client';
import React from 'react';

import {
    CATEGORY_LIST,
    deleteCategory,
    getCategoryList,
    updateManyCategory,
} from 'src/shared/graphql/Category/schema.gql';

import { MasterList } from './MasterList';
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
            list: getCategoryList,
            refetch: CATEGORY_LIST,
        },
        handleData: jest.fn().mockImplementation(() => mockDataCategory),
        handleRecord: jest.fn(),
        handleResetAction: jest.fn(),
    };
    let queryHandler = jest
        .fn()
        .mockResolvedValue({ data: { getCategoryList: { data: mockCategory, total: 11 } } });
    mockClient.setRequestHandler(CATEGORY_LIST, queryHandler);
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
