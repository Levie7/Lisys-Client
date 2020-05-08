import { shallow } from 'enzyme';
import React from 'react';

import { Menu } from '../Menu';

describe('Menu', () => {
    let wrap: any;
    const props = {
        className: 'Menu',
        onClick: jest.fn(),
    };
    it('should render menu', () => {
        wrap = shallow(<Menu {...props} />);
        expect(wrap.find('Menu').exists()).toBeTruthy();
    });
});
