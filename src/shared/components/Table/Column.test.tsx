import { shallow } from 'enzyme';
import React from 'react';

import { Column } from './Column';

describe('Column', () => {
    let wrap: any;
    const props = {
        dataIndex: '1',
        key: 'id1',
        title: 'ID',
    };
    it('should render Column', () => {
        wrap = shallow(<Column {...props} />);
        expect(wrap.find('Column').exists()).toBeTruthy();
    });
});
