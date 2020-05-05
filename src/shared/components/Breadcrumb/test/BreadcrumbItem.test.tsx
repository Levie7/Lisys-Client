import { mount } from 'enzyme';
import React from 'react';

import { BreadcrumbItem } from '../BreadcrumbItem';

describe('BreadcrumbItem', () => {
    let wrap: any;
    const props = {
        href: '/master',
    };
    it('should render breadcrumb item', () => {
        wrap = mount(<BreadcrumbItem {...props} />);
        expect(wrap.find('BreadcrumbItem').exists()).toBeTruthy();
    });
});
