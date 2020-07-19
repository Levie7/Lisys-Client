import { mount } from 'enzyme';
import React from 'react';

import { StockOpnameHeader, StockOpnameHeaderProps } from './StockOpnameHeader';

describe('StockOpnameHeader', () => {
    let wrap: any;
    let props: StockOpnameHeaderProps = {
        date: '20-07-2020',
        lang: 'en',
        no: 'PI/123',
    };

    it('should render StockOpnameHeader', () => {
        wrap = mount(<StockOpnameHeader {...props} />);
        expect(wrap.find('Memo()').exists()).toBeTruthy();
    });
});
