import { ApolloProvider } from '@apollo/react-hooks';
import { act } from '@testing-library/react';
import { mount } from 'enzyme';
import { createMockClient } from 'mock-apollo-client';
import React from 'react';

import { USER_LIST } from 'src/shared/graphql/User/schema.gql';

import { mockUser } from './mocks/mockData';
import { UserList } from './UserList';

let mockClient = createMockClient();
describe('UserList', () => {
    let wrap: any;
    const props = {
        handleRecord: jest.fn(),
    };
    let queryHandler = jest.fn().mockResolvedValue({
        data: {
            getUserList: {
                data: mockUser,
                total: 11,
            },
        },
    });
    mockClient.setRequestHandler(USER_LIST, queryHandler);

    it('should render user list', async () => {
        await act(async () => {
            wrap = mount(
                <ApolloProvider client={mockClient}>
                    <UserList {...props} />
                </ApolloProvider>
            );
        });

        expect(wrap.find('UserList').exists()).toBeTruthy();
    });

    describe('when data is loaded', () => {
        beforeEach(async () => {
            await act(async () => {
                wrap = mount(
                    <ApolloProvider client={mockClient}>
                        <UserList {...props} />
                    </ApolloProvider>
                );
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
