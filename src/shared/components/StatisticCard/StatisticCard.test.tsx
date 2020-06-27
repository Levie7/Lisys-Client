import { mount } from 'enzyme';
import React from 'react';

import { StatisticCard } from './StatisticCard';

describe('StatisticCard', () => {
    let wrap: any;
    let props = {
        icon: 'medicine-box',
        title: 'Total Obat',
        value: '10000',
    };

    it('should render StatisticCard', () => {
        wrap = mount(<StatisticCard {...props} />);
        expect(wrap.find('Memo(StatisticCardPure)').exists()).toBeTruthy();
    });
});
