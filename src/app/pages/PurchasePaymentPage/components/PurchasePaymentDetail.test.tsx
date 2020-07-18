import { mount } from 'enzyme';
import React from 'react';

import { PurchasePaymentDetail } from './PurchasePaymentDetail';

describe('PurchasePaymentDetail', () => {
    let wrap: any;
    let props = { data: { getPurchasePaymentById: { detail: [] } } };

    it('should render PurchasePaymentDetail', () => {
        wrap = mount(<PurchasePaymentDetail {...props} />);
        expect(wrap.find('Memo()').exists()).toBeTruthy();
    });
});
