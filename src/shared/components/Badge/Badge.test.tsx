import { mount } from 'enzyme';
import React from 'react';

import { Badge, Status } from './Badge';

describe('Badge', () => {
    let wrap: any;
    const props: { status: Status; text: React.ReactNode } = {
        status: 'success',
        text: 'Active',
    };

    it('should render badge', () => {
        wrap = mount(<Badge {...props} />);
        expect(wrap.find('Badge').exists()).toBeTruthy();
    });
});
