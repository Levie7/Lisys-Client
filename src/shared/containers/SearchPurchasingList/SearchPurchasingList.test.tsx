import { ApolloProvider } from '@apollo/react-hooks';
import { act } from '@testing-library/react';
import { mount } from 'enzyme';
import { createMockClient } from 'mock-apollo-client';
import React from 'react';

import { MEDICINE_BY_QUERY } from 'src/shared/graphql/Medicine/schema.gql';

import { SearchPurchasingList } from './SearchPurchasingList';

let mockClient = createMockClient();
describe('SearchPurchasingList', () => {
    let wrap: any;
    let searchMedicine: any;
    const props = {
        supplier_id: 'supplier1',
        onRecordList: jest.fn(),
    };
    let queryHandler = jest.fn().mockResolvedValue({
        data: {
            getMedicineByQuery: {
                barcode: '123',
                buy_price: '123',
                category: {
                    id: 'id1',
                    name: 'category1',
                },
                code: 'code1',
                id: 'id1',
                min_stock: '1',
                name: 'name1',
                sell_price: '123',
                status: 'active',
                stock: '1',
                uom: {
                    id: 'id1',
                    name: 'uom1',
                },
                variant: {
                    id: 'id1',
                    name: 'variant1',
                },
            },
        },
    });
    mockClient.setRequestHandler(MEDICINE_BY_QUERY, queryHandler);

    it('should render SearchPurchasingList', async () => {
        await act(async () => {
            wrap = mount(
                <ApolloProvider client={mockClient}>
                    <SearchPurchasingList {...props} ref={(ref) => (searchMedicine = ref)} />
                </ApolloProvider>
            );
        });

        expect(wrap.find('ForwardRef(SearchPurchasingListPure)').exists()).toBeTruthy();
        expect(searchMedicine.closeList).toBeDefined();
    });

    describe('when click list button', () => {
        beforeAll(() => {
            wrap.find('button.ant-btn-default').simulate('click');
        });
        it('should show modal', () => {
            expect(wrap.find('MasterSearchList').exists()).toBeTruthy();
        });
    });

    test('call searchMedicine ref and close modal', () => {
        searchMedicine.closeList();
        wrap.update();
        expect(
            wrap
                .find('Modal')
                .at(0)
                .props().visible
        ).toBeFalsy();
    });
});
