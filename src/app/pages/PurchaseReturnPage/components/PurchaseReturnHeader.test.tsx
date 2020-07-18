import { mount } from 'enzyme';
import React from 'react';

import { PurchaseReturnHeader } from './PurchaseReturnHeader';

describe('PurchaseReturnHeader', () => {
    let wrap: any;
    let props = {
        date: '20-07-2020',
        no: 'PI/123',
        supplier: 'Dwijaya',
    };

    it('should render PurchaseReturnHeader', () => {
        wrap = mount(<PurchaseReturnHeader {...props} />);
        expect(wrap.find('Memo()').exists()).toBeTruthy();
    });
});
