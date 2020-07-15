import { mount } from 'enzyme';
import React from 'react';

import { GraphCard, GraphType } from './GraphCard';

describe('GraphCard', () => {
    let wrap: any;
    let props: {
        data: any;
        options?: any;
        title: string;
        type: GraphType;
    } = {
        data: {},
        options: {},
        title: 'title',
        type: 'line',
    };

    it('should render GraphCard', () => {
        wrap = mount(<GraphCard {...props} />);
        expect(wrap.find('Memo(GraphCardPure)').exists()).toBeTruthy();
    });
});
