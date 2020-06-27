import { mount } from 'enzyme';
import React from 'react';

import { SalesSummary } from './SalesSummary';

describe('SalesSummary', () => {
    let wrap: any;
    let props = {
        amount_total: '10000',
        change_total: '10000',
        isMobile: true,
        qty_total: 1,
        total: '10000',
    };

    it('should render SalesSummary', () => {
        wrap = mount(<SalesSummary {...props} />);
        expect(wrap.find('Memo(SalesSummaryPure)').exists()).toBeTruthy();
    });

    it('should render sales summary with reverse column', () => {
        expect(wrap.find('#SalesSummary').props().className).toEqual('d-flex fd-column-reverse');
    });

    describe('when is not mobile', () => {
        beforeEach(() => {
            let props = {
                amount_total: '10000',
                change_total: '10000',
                isMobile: false,
                qty_total: 1,
                total: '10000',
            };
            wrap = mount(<SalesSummary {...props} />);
        });
        it('should render sales summary', () => {
            expect(wrap.find('#SalesSummary').props().className).toEqual('d-flex');
        });
    });
});
