import { ApolloProvider } from '@apollo/react-hooks';
import { act } from '@testing-library/react';
import { mount } from 'enzyme';
import { createMockClient } from 'mock-apollo-client';
import React from 'react';

import { SETTING } from 'src/shared/graphql/Setting/schema.gql';

import { Footer } from '../Footer';

const mockClient = createMockClient();

describe('Footer', () => {
    let wrap: any;
    let queryHandler = jest.fn().mockResolvedValue({
        data: {
            getSettingsByCategory: [
                { type: 'name', value: 'Lisys' },
                { type: 'year', value: '2020' },
            ],
        },
    });
    mockClient.setRequestHandler(SETTING, queryHandler);

    it('should render footer', async () => {
        await act(async () => {
            wrap = mount(
                <ApolloProvider client={mockClient}>
                    <Footer />
                </ApolloProvider>
            );
        });
        expect(wrap.find('Memo(FooterPure)').exists()).toBeTruthy();
    });

    it('should return spin loading', () => {
        expect(wrap.find('Spin').exists()).toBeTruthy();
    });

    describe('when data is loaded', () => {
        beforeEach(async () => {
            await act(async () => {
                wrap = mount(
                    <ApolloProvider client={mockClient}>
                        <Footer />
                    </ApolloProvider>
                );
            });
        });

        it('should return footer with data', () => {
            expect(wrap.find('#Footer').exists()).toBeTruthy();
        });
    });

    it('<Footer/> - should render footer component correctly', () => {
        expect(wrap).toMatchSnapshot();
    });
});
