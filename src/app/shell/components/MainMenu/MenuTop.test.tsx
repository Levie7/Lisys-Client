import { shallow } from 'enzyme';
import React from 'react';

import { MenuTop } from './MenuTop';

describe('MenuTop', () => {
    let props = { auth: 'sa' };
    let wrap = shallow(<MenuTop {...props} />);

    it('should render drawer wrapper component', () => {
        expect(wrap.find('#MenuTop').exists()).toBeTruthy();
    });
});
