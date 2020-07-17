import { ApolloProvider } from '@apollo/react-hooks';
import { act } from '@testing-library/react';
import { mount } from 'enzyme';
import { createMockClient } from 'mock-apollo-client';
import React from 'react';

import { SUPPLIERS } from 'src/shared/graphql/Supplier/schema.gql';

import { PurchasingGraph } from './PurchasingGraph';
import { PURCHASING_DEBT_PER_MONTH } from './schema.gql';

let mockClient = createMockClient();
let mockSupplier = [
    {
        id: 'id1',
        name: 'supplier1',
        description: 'supplier1',
        status: 'active',
    },
    {
        id: 'id2',
        name: 'supplier2',
        description: 'supplier2',
        status: 'active',
    },
];
describe('PurchasingGraph', () => {
    let wrap: any;
    let querySupplierHandler = jest.fn().mockResolvedValue({
        data: { getSuppliers: mockSupplier },
    });
    let queryPurchasingDebtPerMonthHandler = jest.fn().mockResolvedValue({
        data: {
            getPurchasingDebtPerMonth: [
                {
                    _id: {
                        period: '2020-07',
                    },
                    credit_total: 3000,
                },
            ],
        },
    });
    mockClient.setRequestHandler(SUPPLIERS, querySupplierHandler);
    mockClient.setRequestHandler(PURCHASING_DEBT_PER_MONTH, queryPurchasingDebtPerMonthHandler);

    it('should render PurchasingGraph', async () => {
        await act(async () => {
            wrap = mount(
                <ApolloProvider client={mockClient}>
                    <PurchasingGraph />
                </ApolloProvider>
            );
        });
        console.log(wrap.debug());
        expect(wrap.find('PurchasingGraph').exists()).toBeTruthy();
    });
});
