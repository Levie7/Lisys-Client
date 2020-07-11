import { shallow } from 'enzyme';
import React from 'react';

import { MenuLeft } from './MenuLeft';

describe('MenuLeft', () => {
    let props = { auth: 'sa', isMobile: true };
    const setState = jest.fn();

    let wrap = shallow(<MenuLeft {...props} />);

    it('should render drawer wrapper component', () => {
        expect(wrap.find('Sider').exists()).toBeTruthy();
        expect(wrap.find('Scrollbars').exists()).toBeTruthy();
        expect(wrap.find('.MenuLeft_Logo').exists()).toBeTruthy();
    });

    describe('when is mobile', () => {
        beforeEach(() => {
            props = { auth: 'sa', isMobile: true };
            wrap = shallow(<MenuLeft {...props} />);
        });

        it('should render sider with uncollapsible', () => {
            expect(wrap.find('Sider').props().collapsible).toBeFalsy();
        });
    });

    describe('when is not mobile', () => {
        beforeEach(() => {
            props = { auth: 'sa', isMobile: false };
            wrap = shallow(<MenuLeft {...props} />);
        });

        it('should render sider with collapsible', () => {
            expect(wrap.find('Sider').props().collapsible).toBeTruthy();
        });
    });

    describe('when toggleCollapse called with responsive type and onCollapsed', () => {
        let spy: any;
        beforeEach(() => {
            spy = jest.spyOn(wrap.instance(), 'toggleCollapse');
            wrap.setState({ onCollapse: true });
            wrap.instance().toggleCollapse('responsive');
        });

        it('should return empty ', () => {
            expect(spy).toBeCalledWith('responsive');
            expect(spy.mock.results[0].value).not.toBeDefined();
        });

        it('should not set state', () => {
            expect(setState).not.toHaveBeenCalled();
        });
    });
});
