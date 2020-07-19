import { ApolloProvider } from '@apollo/react-hooks';
import { act } from '@testing-library/react';
import { mount } from 'enzyme';
import { createMockClient } from 'mock-apollo-client';
import React from 'react';

import { mockRole } from './mocks/mockData';
import { RoleList, RoleListProps } from './RoleList';
import { ROLE_LIST } from './schema.gql';

let mockClient = createMockClient();
describe('RoleList', () => {
    let wrap: any;
    let props: RoleListProps = {
        lang: 'en',
        handleRecord: jest.fn(),
    };
    let queryHandler = jest.fn().mockResolvedValue({
        data: {
            getRoleList: {
                data: mockRole,
                total: 11,
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
