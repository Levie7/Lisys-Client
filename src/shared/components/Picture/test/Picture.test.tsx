import { shallow } from 'enzyme';
import React from 'react';

import { Ratio } from '../../RatioBox';
import { Picture } from '../Picture';

describe('Picture', () => {
    let wrap: any;
    const props: {
        alt: string;
        imgClassName?: string;
        objectFit?: '' | 'contain' | 'scale-down' | 'cover';
        ratio?: Ratio;
        stretch?: 'none' | 'width' | 'container';
    } = {
        alt: 'alt',
        imgClassName: 'Image',
        objectFit: 'contain',
        ratio: '1:1',
    };
    it('should render Picture', () => {
        wrap = shallow(<Picture {...props} />);
        wrap.setProps({ stretch: 'none' });
        expect(wrap.find('Memo().Picture').exists()).toBeTruthy();
    });
});
