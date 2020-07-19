import { mount } from 'enzyme';
import React from 'react';

import { StockOpnameDetail, StockOpnameDetailProps } from './StockOpnameDetail';

describe('StockOpnameDetail', () => {
    let wrap: any;
    let props: StockOpnameDetailProps = {
        data: {
            getStockOpnameById: {
                detail: [
                    {
                        difference: 1,
                        id: 'id1',
                        medicine: {
                            code: 'code1',
                            id: 'id1',
                            name: 'medicine1',
                            uom: { name: 'uom1' },
                        },
                        physical_stock: 4,
                        system_stock: 3,
                    },
                ],
            },
        },
        lang: 'en',
    };

    it('should render StockOpnameDetail', () => {
        wrap = mount(<StockOpnameDetail {...props} />);
        expect(wrap.find('Memo()').exists()).toBeTruthy();
    });

    describe('when render StockOpnameDetail with empty data', () => {
        beforeEach(() => {
            props = { data: { getStockOpnameById: { detail: [] } }, lang: 'en' };
            wrap = mount(<StockOpnameDetail {...props} />);
        });
        it('should render StockOpnameDetail with empty data', () => {
            expect(wrap.find('.ant-empty-description').exists()).toBeTruthy();
        });
    });
});
