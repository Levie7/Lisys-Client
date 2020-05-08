import { shallow } from 'enzyme';
import React from 'react';

import { Option } from '../Option';

describe('Option', () => {
    let wrap: any;
    const props = {
        disabled: true,
        value: 'Apple',
    };
    it('should render Option', () => {
        wrap = shallow(<Option {...props} />);
        expect(wrap.find('Option').exists()).toBeTruthy();
    });
});
