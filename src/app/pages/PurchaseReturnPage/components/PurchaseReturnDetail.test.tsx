import { mount } from 'enzyme';
import React from 'react';

import { PurchaseReturnDetail, PurchaseReturnDetailProps } from './PurchaseReturnDetail';

describe('PurchaseReturnDetail', () => {
    let wrap: any;
    let props: PurchaseReturnDetailProps = {
        data: { getPurchaseReturnById: { detail: [] } },
        lang: 'en',
    };

    it('should render PurchaseReturnDetail', () => {
        wrap = mount(<PurchaseReturnDetail {...props} />);
        expect(wrap.find('Memo()').exists()).toBeTruthy();
    });
});
