import { shallow } from 'enzyme';
import React from 'react';

import { Switch } from './Switch';

describe('Switch', () => {
    let wrap: any;
    const props: {
        defaultChecked?: boolean;
        handleChange?: any;
    } = {
        defaultChecked: true,
        handleChange: jest.fn(),
    };
    it('should render Switch', () => {
        wrap = shallow(<Switch {...props} />);
        expect(wrap.find('Switch').exists()).toBeTruthy();
    });
});
