import { shallow } from 'enzyme';
import React from 'react';

import { TabPositions } from 'src/shared/components/Tabs';

import { SettingTabs } from '../SettingTabs';

describe('SettingTabs', () => {
    const props: { position: TabPositions } = { position: 'top' };
    const wrap = shallow(<SettingTabs {...props} />);

    it('<SettingTabs/> - should render SettingTabs component correctly', () => {
        expect(wrap).toMatchSnapshot();
    });

    it('should render setting tabs children component', () => {
        expect(wrap.find('Tabs').exists()).toBeTruthy();
        expect(wrap.find('TabPane').exists()).toBeTruthy();
        expect(wrap.find('Memo()').exists()).toBeTruthy();
    });
});
