import { ApolloProvider } from '@apollo/react-hooks';
import { act } from '@testing-library/react';
import { mount } from 'enzyme';
import { createMockClient } from 'mock-apollo-client';
import React from 'react';

import { RoleList } from './RoleList';
import { ROLE_LIST } from './schema.gql';

let mockClient = createMockClient();
describe('RoleList', () => {
    let wrap: any;
    const props = {
        handleRecord: jest.fn(),
    };
    let queryHandler = jest.fn().mockResolvedValue({
        data: {
            getRoleList: {
                data: [
                    {
                        id: 'id1',
                        name: 'role1',
                        description: 'role1',
                    },
                ],
                total: 1,
            },
        },
    });
    mockClient.setRequestHandler(ROLE_LIST, queryHandler);

    it('should render role list', async () => {
        await act(async () => {
            wrap = mount(
                <ApolloProvider client={mockClient}>
                    <RoleList {...props} />
                </ApolloProvider>
            );
        });

        expect(wrap.find('RoleList').exists()).toBeTruthy();
    });

    describe('when data is loaded', () => {
        beforeEach(async () => {
            await act(async () => {
                wrap = mount(
                    <ApolloProvider client={mockClient}>
                        <RoleList {...props} />
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
