import { mount } from 'enzyme';
import React from 'react';

import { SalesHeader } from './SalesHeader';

describe('SalesHeader', () => {
    let wrap: any;
    let props = {
        date: '20-07-2020',
        no: 'PI/123',
    };

    it('should render SalesHeader', () => {
        wrap = mount(<SalesHeader {...props} />);
        expect(wrap.find('Memo()').exists()).toBeTruthy();
    });
});
