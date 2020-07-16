import { mount } from 'enzyme';
import React from 'react';

import { Excel } from './Excel';

describe('Excel', () => {
    let wrap: any;
    let props = {
        column: [
            {
                label: 'label',
                value: 'label',
            },
        ],
        data: [{ label: 'label a' }],
        fileName: 'Label.xlsx',
        sheetName: 'Sheet 1',
    };

    it('should render Excel', () => {
        wrap = mount(<Excel {...props} />);
        expect(wrap.find('Memo()').exists()).toBeTruthy();
    });
});
