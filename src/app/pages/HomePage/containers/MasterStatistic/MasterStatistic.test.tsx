import { ApolloProvider } from '@apollo/react-hooks';
import { act } from '@testing-library/react';
import { mount } from 'enzyme';
import { createMockClient } from 'mock-apollo-client';
import React from 'react';

import { MasterStatistic } from './MasterStatistic';
import { MASTER_TOTAL } from './schema.gql';

let mockClient = createMockClient();
describe('MasterStatistic', () => {
    let wrap: any;
    let queryHandler = jest.fn().mockResolvedValue({
        data: {
            getMasterTotal: {
                total_category: 1,
                total_medicine: 1,
                total_supplier: 1,
                total_uom: 1,
                total_variant: 1,
            },
        },
    });
    mockClient.setRequestHandler(MASTER_TOTAL, queryHandler);

    it('should render MasterStatistic', async () => {
        await act(async () => {
            wrap = mount(
                <ApolloProvider client={mockClient}>
                    <MasterStatistic />
                </ApolloProvider>
            );
        });

        expect(wrap.find('MasterStatistic').exists()).toBeTruthy();
    });
});
