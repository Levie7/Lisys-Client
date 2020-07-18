import { mount } from 'enzyme';
import React from 'react';

import { PurchasePaymentHeader } from './PurchasePaymentHeader';

describe('PurchasePaymentHeader', () => {
    let wrap: any;
    let props = {
        date: '20-07-2020',
        no: 'PI/123',
        payment_method: 'transfer',
        payment_no: '1',
        supplier: 'Dwijaya',
    };

    it('should render PurchasePaymentHeader', () => {
        wrap = mount(<PurchasePaymentHeader {...props} />);
        expect(wrap.find('Memo()').exists()).toBeTruthy();
    });
});
