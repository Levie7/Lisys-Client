import { enquireScreen } from 'enquire-js';
import { shallow } from 'enzyme';
import * as React from 'react';

import { MainLayout } from './MainLayout';

jest.mock('enquire-js');
describe('MainLayout', () => {
    const wrap = shallow(<MainLayout />);
    wrap.setState({ isMobile: false });

    it('should contains provide context', () => {
        expect(wrap.find('ContextProvider').exists()).toBeTruthy();
    });

    it('should call component did mount', () => {
        MainLayout.prototype.componentDidMount();
    });

    describe('when enquireHandler called', () => {
        let enquireHandler = jest.fn().mockImplementation(() => enquireScreen());
        test('call enquirehandler', () => {
            enquireHandler();
            expect(enquireScreen).toHaveBeenCalled();
            expect(wrap.state('isMobile')).toBeFalsy();
        });
    });

    it('should have property unmount', () => {
        wrap.unmount();
    });
});
