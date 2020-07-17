import { mount } from 'enzyme';
import React from 'react';

import { ReportCard } from './ReportCard';

describe('ReportCard', () => {
    let wrap: any;
    let props = {
        title: 'Medicine List',
        url: '/medicine_list',
    };

    it('should render ReportCard', () => {
        wrap = mount(<ReportCard {...props} />);
        expect(wrap.find('Memo(ReportCardPure)').exists()).toBeTruthy();
    });
});
