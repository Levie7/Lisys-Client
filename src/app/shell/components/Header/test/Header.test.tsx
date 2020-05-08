import { shallow } from 'enzyme';
import React from 'react';

import { Header } from '../Header';

describe('Header', () => {
    const wrap = shallow(<Header />);

    it('<Header/> - should render header component correctly', () => {
        expect(wrap).toMatchSnapshot();
    });

    it('should render header', () => {
        expect(wrap.find('.Header').exists()).toBeTruthy();
    });
});
