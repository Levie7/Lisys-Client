import { shallow } from 'enzyme';
import React from 'react';

import { Ratio, RatioBox } from '../RatioBox';

describe('RatioBox', () => {
    let wrap: any;
    const props: { ratio: Ratio } = {
        ratio: '1:1',
    };
    it('should render RatioBox', () => {
        wrap = shallow(<RatioBox {...props} />);
        expect(wrap.find('.RatioBox-1-1').exists()).toBeTruthy();
    });
});
