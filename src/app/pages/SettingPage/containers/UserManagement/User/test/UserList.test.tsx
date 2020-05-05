import { ApolloProvider } from '@apollo/react-hooks';
import { act } from '@testing-library/react';
import { mount } from 'enzyme';
import { createMockClient } from 'mock-apollo-client';
import React from 'react';

import { UserList } from '../UserList';
import { USERS } from '../schema.gql';

let mockClient = createMockClient();
describe('UserList', () => {
    let wrap: any;
    const props = {
        handleRecord: jest.fn(),
    };
    let queryHandler = jest.fn().mockResolvedValue({
        data: {
            getUsers: [
                {
                    id: 'id1',
                    name: 'user1',
                    password: 'password1',
                    role: {
                        name: 'role1',
                    },
                    username: 'username1',
                },
            ],
        },
    });
    mockClient.setRequestHandler(USERS, queryHandler);

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

        it('should list with data', () => {
            expect(wrap.find('BodyRow').exists()).toBeTruthy();
            expect(wrap.find('BodyRow').props().rowKey).toEqual('id1');
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
