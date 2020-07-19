import { ApolloProvider } from '@apollo/react-hooks';
import { act, fireEvent, render } from '@testing-library/react';
import { mount } from 'enzyme';
import { createMockClient } from 'mock-apollo-client';
import React from 'react';

import { SETTING } from 'src/shared/graphql/Setting/schema.gql';

import { GeneralForm, GeneralFormProps } from './GeneralForm';

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
let mockGeneral = [
    { type: 'date_format', value: 'date1' },
    { type: 'time_format', value: 'time1' },
    { type: 'language', value: 'language1' },
];
let initialValues = { date_format: 'date1', language: 'language1', time_format: 'time1' };
describe('GeneralForm', () => {
    let wrap: any;
    let props: GeneralFormProps = { lang: 'en' };
    let queryHandler = jest.fn().mockResolvedValue({
        data: { getSettingsByCategory: mockGeneral },
    });
    mockClient.setRequestHandler(SETTING, queryHandler);

    it('should render general form', async () => {
        await act(async () => {
            wrap = mount(
                <ApolloProvider client={mockClient}>
                    <GeneralForm {...props} />
                </ApolloProvider>
            );
        });

        expect(wrap.find('GeneralForm').exists()).toBeTruthy();
    });

    describe('when data is loaded', () => {
        beforeEach(async () => {
            await act(async () => {
                wrap = mount(
                    <ApolloProvider client={mockClient}>
                        <GeneralForm {...props} />
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
                            <GeneralForm {...props} />
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
