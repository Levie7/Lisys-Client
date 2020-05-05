import { shallow } from 'enzyme';
import React from 'react';

import { MenuTop } from '../MenuTop';

describe('MenuTop', () => {
    const wrap = shallow(<MenuTop />);

    it('<MenuTop/> - should render MenuTop component correctly', () => {
        expect(wrap).toMatchSnapshot();
    });

    it('should render drawer wrapper component', () => {
        expect(wrap.find('#MenuTop').exists()).toBeTruthy();
    });
});
