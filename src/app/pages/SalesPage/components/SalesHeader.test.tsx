import { mount } from 'enzyme';
import React from 'react';

import { SalesHeader, SalesHeaderProps } from './SalesHeader';

describe('SalesHeader', () => {
    let wrap: any;
    let props: SalesHeaderProps = {
        date: '20-07-2020',
        lang: 'en',
        no: 'PI/123',
    };

    it('should render SalesHeader', () => {
        wrap = mount(<SalesHeader {...props} />);
        expect(wrap.find('Memo()').exists()).toBeTruthy();
    });
});
