import { mount } from 'enzyme';
import React from 'react';

import { PurchaseReturnDetail } from './PurchaseReturnDetail';

describe('PurchaseReturnDetail', () => {
    let wrap: any;
    let props = { data: { getPurchaseReturnById: { detail: [] } } };

    it('should render PurchaseReturnDetail', () => {
        wrap = mount(<PurchaseReturnDetail {...props} />);
        expect(wrap.find('Memo()').exists()).toBeTruthy();
    });
});
