import { shallow } from 'enzyme';
import React from 'react';

import { TabPositions, Tabs } from './Tabs';

describe('Tabs', () => {
    let wrap: any;
    const props: {
        className?: string;
        defaultActiveKey?: string;
        tabPosition?: TabPositions;
    } = {
        className: 'Tabs',
        defaultActiveKey: 'id1',
        tabPosition: 'top',
    };
    it('should render Tabs', () => {
        wrap = shallow(<Tabs {...props} />);
        expect(wrap.find('Tabs').exists()).toBeTruthy();
    });
});
