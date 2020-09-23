import { mount } from 'enzyme';
import React from 'react';

import { SalesReturnHeader, SalesReturnHeaderProps } from './SalesReturnHeader';

describe('SalesReturnHeader', () => {
    let wrap: any;
    let props: SalesReturnHeaderProps = {
        date: '20-07-2020',
        lang: 'en',
        no: 'PI/123',
    };

    it('should render SalesReturnHeader', () => {
        wrap = mount(<SalesReturnHeader {...props} />);
        expect(wrap.find('Memo()').exists()).toBeTruthy();
    });
});
