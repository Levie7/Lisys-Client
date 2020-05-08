import { shallow } from 'enzyme';
import React from 'react';

import { Link } from '../Link';

describe('Link', () => {
    let wrap: any;
    const props = {
        disabled: true,
        to: '/master',
    };
    it('should render link', () => {
        wrap = shallow(<Link {...props} />);
        expect(wrap.find('Link').exists()).toBeTruthy();
    });
});
