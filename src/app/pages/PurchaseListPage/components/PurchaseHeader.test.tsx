import { mount } from 'enzyme';
import React from 'react';

import { PurchaseHeader, PurchaseHeaderProps } from './PurchaseHeader';

describe('PurchaseHeader', () => {
    let wrap: any;
    let props: PurchaseHeaderProps = {
        date: '20-07-2020',
        due_date: '20-07-2020',
        lang: 'en',
        no: 'PI/123',
        supplier: 'Dwijaya',
    };

    it('should render PurchaseHeader', () => {
        wrap = mount(<PurchaseHeader {...props} />);
        expect(wrap.find('Memo()').exists()).toBeTruthy();
    });
});
