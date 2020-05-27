import { ApolloProvider } from '@apollo/react-hooks';
import { act } from '@testing-library/react';
import { mount } from 'enzyme';
import { createMockClient } from 'mock-apollo-client';
import React from 'react';

import { CATEGORY_LIST, getCategoryList } from 'src/shared/graphql/Category/schema.gql';

import { MasterSearchList } from './MasterSearchList';
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
describe('MasterSearchList', () => {
    let wrap: any;
    let props = {
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
        query: getCategoryList,
        handleData: jest.fn().mockImplementation(() => mockDataCategory),
        handleRecord: jest.fn(),
    };
    let queryHandler = jest
        .fn()
        .mockResolvedValue({ data: { getCategoryList: { data: mockCategory, total: 11 } } });
    mockClient.setRequestHandler(CATEGORY_LIST, queryHandler);
    const Component = ({ properties }: any) => (
        <ApolloProvider client={mockClient}>
            <MasterSearchList {...properties} />
        </ApolloProvider>
    );
    it('should render master list', async () => {
        await act(async () => {
            wrap = mount(<Component properties={props} />);
        });
        expect(wrap.find('MasterSearchList').exists()).toBeTruthy();
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
    });
});
