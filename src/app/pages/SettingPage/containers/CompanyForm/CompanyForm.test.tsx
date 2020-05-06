import { ApolloProvider } from '@apollo/react-hooks';
import { act, fireEvent, render } from '@testing-library/react';
import { mount } from 'enzyme';
import { createMockClient } from 'mock-apollo-client';
import React from 'react';

import { SETTING } from 'src/shared/graphql/Setting/schema.gql';

import { CompanyForm } from './CompanyForm';

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
let mockCompany = [
    { type: 'name', value: 'lisys' },
    { type: 'year', value: '2020' },
];
let initialValues = { company_name: 'lisys', company_year: '2020' };
describe('CompanyForm', () => {
    let wrap: any;
    let queryHandler = jest.fn().mockResolvedValue({
        data: { getSettingsByCategory: mockCompany },
    });
    mockClient.setRequestHandler(SETTING, queryHandler);

    it('should render company form', async () => {
        await act(async () => {
            wrap = mount(
                <ApolloProvider client={mockClient}>
                    <CompanyForm />
                </ApolloProvider>
            );
        });

        expect(wrap.find('CompanyForm').exists()).toBeTruthy();
    });

    describe('when data is loaded', () => {
        beforeEach(async () => {
            await act(async () => {
                wrap = mount(
                    <ApolloProvider client={mockClient}>
                        <CompanyForm />
                    </ApolloProvider>
                );
            });
        });
        it('should render form with data', () => {
            expect(wrap.find('ForwardRef(InternalForm)').exists()).toBeTruthy();
            expect(wrap.find('ForwardRef(InternalForm)').props().initialValues).toEqual(
                initialValues
            );
        });

        describe('when user submit form', () => {
            test('should resolve validating and refetch query', async () => {
                await act(async () => {
                    const { getByText } = render(
                        <ApolloProvider client={mockClient}>
                            <CompanyForm />
                        </ApolloProvider>
                    );
                    fireEvent.submit(getByText('Save'));
                });
                expect(wrap.find('ForwardRef(InternalForm)').props().initialValues).toEqual(
                    initialValues
                );
            });
        });
    });
});
