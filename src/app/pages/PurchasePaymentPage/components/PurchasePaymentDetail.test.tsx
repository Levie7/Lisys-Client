import { mount } from 'enzyme';
import React from 'react';

import { PurchasePaymentDetail, PurchasePaymentDetailProps } from './PurchasePaymentDetail';

describe('PurchasePaymentDetail', () => {
    let wrap: any;
    let props: PurchasePaymentDetailProps = {
        data: { getPurchasePaymentById: { detail: [] } },
        lang: 'en',
    };

    it('should render PurchasePaymentDetail', () => {
        wrap = mount(<PurchasePaymentDetail {...props} />);
        expect(wrap.find('Memo()').exists()).toBeTruthy();
    });
});
