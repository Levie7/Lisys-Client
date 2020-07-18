import { mount } from 'enzyme';
import React from 'react';

import { PurchaseDetail } from './PurchaseDetail';

describe('PurchaseDetail', () => {
    let wrap: any;
    let props = { data: { getPurchasingById: { detail: [] } } };

    it('should render PurchaseDetail', () => {
        wrap = mount(<PurchaseDetail {...props} />);
        expect(wrap.find('Memo()').exists()).toBeTruthy();
    });
});
