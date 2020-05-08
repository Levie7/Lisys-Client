import { ApolloProvider } from '@apollo/react-hooks';
import { act } from '@testing-library/react';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { mount } from 'enzyme';
import { createMockClient } from 'mock-apollo-client';
import React from 'react';

import { CRUD } from 'src/core/graphql/crud';
import { resolvers } from 'src/core/graphql/resolvers';

import { UserManagement } from './UserManagement';

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
const cache = new InMemoryCache();
let crud = {
    action: 'back',
    section: 'main',
    __typename: 'Crud',
};
cache.writeData({ data: { getCrud: crud } });
let mockClient = createMockClient({ cache, resolvers });
describe('UserManagement', () => {
    let wrap: any;
    let queryHandler = jest.fn().mockResolvedValue({ data: { getCrud: crud } });
    mockClient.setRequestHandler(CRUD, queryHandler);

    it('should render user management', async () => {
        await act(async () => {
            wrap = mount(
                <ApolloProvider client={mockClient}>
                    <UserManagement />
                </ApolloProvider>
            );
        });
        expect(wrap.find('UserManagement').exists()).toBeTruthy();
    });

    describe('when section is main and action is back', () => {
        beforeEach(async () => {
            await act(async () => {
                wrap = mount(
                    <ApolloProvider client={mockClient}>
                        <UserManagement />
                    </ApolloProvider>
                );
            });
        });

        it('should render user management form', () => {
            expect(wrap.find('UserManagementForm').exists()).toBeTruthy();
        });
    });

    describe('when section is role', () => {
        beforeEach(async () => {
            crud = { ...crud, section: 'role' };
        });

        describe('and action is list', () => {
            beforeEach(async () => {
                crud = { ...crud, action: 'list' };
                cache.writeData({ data: { getCrud: crud } });
                mockClient = createMockClient({ cache, resolvers });
                queryHandler = jest.fn().mockResolvedValue({ data: { getCrud: crud } });
                mockClient.setRequestHandler(CRUD, queryHandler);
                await act(async () => {
                    wrap = mount(
                        <ApolloProvider client={mockClient}>
                            <UserManagement />
                        </ApolloProvider>
                    );
                });
            });

            it('should render role list', async () => {
                expect(wrap.find('RoleList').exists()).toBeTruthy();
            });
        });

        describe('and action is create/ update', () => {
            beforeEach(async () => {
                crud = { ...crud, action: 'create' };
                cache.writeData({ data: { getCrud: crud } });
                mockClient = createMockClient({ cache, resolvers });
                queryHandler = jest.fn().mockResolvedValue({ data: { getCrud: crud } });
                mockClient.setRequestHandler(CRUD, queryHandler);

                await act(async () => {
                    wrap = mount(
                        <ApolloProvider client={mockClient}>
                            <UserManagement />
                        </ApolloProvider>
                    );
                });
            });

            it('should render role form', () => {
                expect(wrap.find('RoleForm').exists()).toBeTruthy();
            });
        });
    });

    describe('when section is user', () => {
        beforeEach(async () => {
            crud = { ...crud, section: 'user' };
        });

        describe('and action is list', () => {
            beforeEach(async () => {
                crud = { ...crud, action: 'list' };
                cache.writeData({ data: { getCrud: crud } });
                mockClient = createMockClient({ cache, resolvers });
                queryHandler = jest.fn().mockResolvedValue({ data: { getCrud: crud } });
                mockClient.setRequestHandler(CRUD, queryHandler);

                await act(async () => {
                    wrap = mount(
                        <ApolloProvider client={mockClient}>
                            <UserManagement />
                        </ApolloProvider>
                    );
                });
            });

            it('should render user list', () => {
                expect(wrap.find('UserList').exists()).toBeTruthy();
            });
        });

        describe('and action is create/update', () => {
            beforeEach(async () => {
                crud = { ...crud, action: 'create' };
                cache.writeData({ data: { getCrud: crud } });
                mockClient = createMockClient({ cache, resolvers });
                queryHandler = jest.fn().mockResolvedValue({ data: { getCrud: crud } });
                mockClient.setRequestHandler(CRUD, queryHandler);

                await act(async () => {
                    wrap = mount(
                        <ApolloProvider client={mockClient}>
                            <UserManagement />
                        </ApolloProvider>
                    );
                });
            });

            it('should render user form', () => {
                expect(wrap.find('UserForm').exists()).toBeTruthy();
            });
        });
    });

    describe('when section is not available', () => {
        beforeEach(async () => {
            crud = { ...crud, section: 'section' };
        });

        describe('and action is list', () => {
            beforeEach(async () => {
                crud = { ...crud, action: 'list' };
                cache.writeData({ data: { getCrud: crud } });
                mockClient = createMockClient({ cache, resolvers });
                queryHandler = jest.fn().mockResolvedValue({ data: { getCrud: crud } });
                mockClient.setRequestHandler(CRUD, queryHandler);

                await act(async () => {
                    wrap = mount(
                        <ApolloProvider client={mockClient}>
                            <UserManagement />
                        </ApolloProvider>
                    );
                });
            });

            it('should render role list', () => {
                expect(wrap.find('RoleList').exists()).toBeFalsy();
            });
        });

        describe('and action is create/ update', () => {
            beforeEach(async () => {
                crud = { ...crud, action: 'create' };
                cache.writeData({ data: { getCrud: crud } });
                mockClient = createMockClient({ cache, resolvers });
                queryHandler = jest.fn().mockResolvedValue({ data: { getCrud: crud } });
                mockClient.setRequestHandler(CRUD, queryHandler);

                await act(async () => {
                    wrap = mount(
                        <ApolloProvider client={mockClient}>
                            <UserManagement />
                        </ApolloProvider>
                    );
                });
            });

            it('should render role form', () => {
                expect(wrap.find('RoleForm').exists()).toBeFalsy();
            });
        });
    });
});
