import { mount } from 'enzyme';
import React from 'react';

import { Drawer } from './Drawer';

describe('Drawer', () => {
    let wrap: any;
    let props = {
        children: jest.fn(),
        loading: true,
        title: { en: 'Medicine', id: 'Obat' },
        visible: true,
    };
    it('should render Drawer', () => {
        wrap = mount(<Drawer {...props} />);
        expect(wrap.find('Memo()').exists()).toBeTruthy();
    });
});
