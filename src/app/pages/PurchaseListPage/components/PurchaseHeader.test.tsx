import { mount } from 'enzyme';
import React from 'react';

import { PurchaseHeader } from './PurchaseHeader';

describe('PurchaseHeader', () => {
    let wrap: any;
    let props = { date: '20-07-2020', due_date: '20-07-2020', no: 'PI/123', supplier: 'Dwijaya' };

    it('should render PurchaseHeader', () => {
        wrap = mount(<PurchaseHeader {...props} />);
        expect(wrap.find('Memo()').exists()).toBeTruthy();
    });
});
