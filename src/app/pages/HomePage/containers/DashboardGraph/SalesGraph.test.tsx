import { ApolloProvider } from '@apollo/react-hooks';
import { act } from '@testing-library/react';
import { mount } from 'enzyme';
import { createMockClient } from 'mock-apollo-client';
import React from 'react';

import { SalesGraph } from './SalesGraph';
import { SALES_DATES, SALES_PER_DAY, SALES_PER_MONTH } from './schema.gql';

let mockClient = createMockClient();
describe('SalesGraph', () => {
    let wrap: any;
    let querySalesDateHandler = jest.fn().mockResolvedValue({
        data: {
            getSalesDateByPeriod: ['01', '02', '03'],
        },
    });
    let querySalesPerDayHandler = jest.fn().mockResolvedValue({
        data: {
            getSalesPerDay: [
                {
                    _id: '2020-07-16',
                    grand_total: 3000,
                },
            ],
        },
    });
    let querySalesPerMonthHandler = jest.fn().mockResolvedValue({
        data: {
            getSalesPerMonth: [
                {
                    _id: '2020-07',
                    grand_total: 3000,
                },
            ],
        },
    });
    mockClient.setRequestHandler(SALES_DATES, querySalesDateHandler);
    mockClient.setRequestHandler(SALES_PER_DAY, querySalesPerDayHandler);
    mockClient.setRequestHandler(SALES_PER_MONTH, querySalesPerMonthHandler);

    it('should render SalesGraph', async () => {
        await act(async () => {
            wrap = mount(
                <ApolloProvider client={mockClient}>
                    <SalesGraph />
                </ApolloProvider>
            );
        });

        expect(wrap.find('SalesGraph').exists()).toBeTruthy();
    });
});
