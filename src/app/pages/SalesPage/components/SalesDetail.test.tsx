import { mount } from 'enzyme';
import React from 'react';

import { SalesDetail } from './SalesDetail';

describe('SalesDetail', () => {
    let wrap: any;
    let props = {
        data: {
            getSalesById: {
                detail: [
                    {
                        id: 'id1',
                        medicine: {
                            code: 'code1',
                            id: 'id1',
                            name: 'medicine',
                            uom: { name: 'uom' },
                        },
                        qty: 1,
                        sell_price: 2000,
                        sub_total: 2000,
                    },
                ],
            },
        },
    };

    it('should render SalesDetail', () => {
        wrap = mount(<SalesDetail {...props} />);
        expect(wrap.find('Memo()').exists()).toBeTruthy();
    });

    describe('when render SalesDetail with empty data', () => {
        beforeEach(() => {
            props = { data: { getSalesById: { detail: [] } } };
            wrap = mount(<SalesDetail {...props} />);
        });
        it('should render SalesDetail with empty data', () => {
            expect(wrap.find('.ant-empty-description').exists()).toBeTruthy();
        });
    });
});
