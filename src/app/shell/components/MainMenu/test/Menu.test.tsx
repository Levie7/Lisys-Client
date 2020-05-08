import { shallow } from 'enzyme';
import React from 'react';

import { Menu } from '../Menu';

describe('Menu', () => {
    const wrap = shallow(<Menu />);

    it('<Menu/> - should render Menu component correctly', () => {
        expect(wrap).toMatchSnapshot();
    });

    it('should contains all Menu children', () => {
        expect(wrap.find('Menu').exists()).toBeTruthy();
        expect(wrap.find('MenuItem').exists()).toBeTruthy();
        expect(wrap.find('SubMenu').exists()).toBeTruthy();
    });
});
