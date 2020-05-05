import { shallow } from 'enzyme';
import * as React from 'react';

import { HomePage } from '../HomePage';

describe('HomePage', () => {
    const wrap = shallow(<HomePage />);

    it('<HomePage/> - should render HomePage component correctly', () => {
        expect(wrap).toMatchSnapshot();
    });
});
