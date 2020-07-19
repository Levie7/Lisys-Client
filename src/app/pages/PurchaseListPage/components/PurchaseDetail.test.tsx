import { mount } from 'enzyme';
import React from 'react';

import { PurchaseDetail, PurchaseDetailProps } from './PurchaseDetail';

describe('PurchaseDetail', () => {
    let wrap: any;
    let props: PurchaseDetailProps = { data: { getPurchasingById: { detail: [] } }, lang: 'en' };

    it('should render PurchaseDetail', () => {
        wrap = mount(<PurchaseDetail {...props} />);
        expect(wrap.find('Memo()').exists()).toBeTruthy();
    });
});
