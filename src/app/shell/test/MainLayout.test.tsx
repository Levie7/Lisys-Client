import { shallow } from 'enzyme';
import * as React from 'react';

import { MainLayout } from '../MainLayout';

describe('MainLayout', () => {
    const wrap = shallow(<MainLayout />);
    wrap.setState({ isMobile: false });

    const setState = jest.fn().mockImplementation((mobile: boolean) => {
        wrap.setState({ isMobile: mobile });
    });
    const enquireScreen = jest.fn().mockImplementation((mobile: any) => {
        setState(mobile);
    });

    it('<MainLayout/> - should render mainLayout component correctly', () => {
        expect(wrap).toMatchSnapshot();
    });

    it('should contains all children component', () => {
        expect(wrap.find('ContextProvider').exists()).toBeTruthy();
        expect(wrap.find('Layout').exists()).toBeTruthy();
        expect(wrap.find('Header').exists()).toBeTruthy();
        expect(wrap.find('Content').exists()).toBeTruthy();
        expect(wrap.find('Footer').exists()).toBeTruthy();
        expect(wrap.find('Memo()').exists()).toBeTruthy();
    });

    it('should call component did mount', () => {
        MainLayout.prototype.componentDidMount();
    });

    describe('when enquireHandler called', () => {
        const mobile = true;
        let enquireHandler: any;
        beforeEach(() => {
            enquireHandler = jest
                .spyOn(wrap.instance(), 'enquireHandler')
                .mockImplementation(() => {
                    enquireScreen(mobile);
                });
            wrap.instance().enquireHandler();
        });

        it('should call enquireScreen', () => {
            expect(enquireHandler).toHaveBeenCalled();
            expect(enquireScreen).toHaveBeenCalled();
            expect(setState).toHaveBeenCalled();
        });

        it('should set state depend on is mobile', () => {
            expect(wrap.state('isMobile')).toBeTruthy();
        });
    });

    it('should have property unmount', () => {
        wrap.unmount();
    });
});
