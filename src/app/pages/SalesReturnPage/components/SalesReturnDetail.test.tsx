import { mount } from 'enzyme';
import React from 'react';

import { SalesReturnDetail, SalesReturnDetailProps } from './SalesReturnDetail';

describe('SalesReturnDetail', () => {
    let wrap: any;
    let props: SalesReturnDetailProps = {
        data: { getSalesReturnById: { detail: [] } },
        lang: 'en',
    };

    it('should render SalesReturnDetail', () => {
        wrap = mount(<SalesReturnDetail {...props} />);
        expect(wrap.find('Memo()').exists()).toBeTruthy();
    });
});
