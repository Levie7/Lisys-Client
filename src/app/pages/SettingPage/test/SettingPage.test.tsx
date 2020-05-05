import { shallow } from 'enzyme';
import React from 'react';

import UIContext, * as UIContextModule from 'src/shared/contexts/UIContext';

import SettingPage from '../SettingPage';

describe('SettingPage', () => {
    let context = { isMobile: false };
    jest.spyOn(UIContextModule, 'useUIContext').mockImplementation(() => context);
    let wrap = shallow(
        <UIContext.Provider value={context}>
            <SettingPage />
        </UIContext.Provider>,
        { context }
    );

    it('<SettingPage/> - should render SettingPage component correctly', () => {
        expect(wrap).toMatchSnapshot();
    });

    it('should render setting page component', () => {
        expect(wrap.find('SettingPage').exists()).toBeTruthy();
    });

    describe('when is not mobile', () => {
        beforeEach(() => {
            context = { isMobile: false };
            wrap.dive().setContext(context);
        });

        it('should render setting tabs with position left', () => {
            expect(
                wrap
                    .dive()
                    .find('Memo(SettingTabsPure)')
                    .exists()
            ).toBeTruthy();
            expect(
                wrap
                    .dive()
                    .find('Memo(SettingTabsPure)')
                    .props().position
            ).toEqual('left');
        });
    });

    describe('when is mobile', () => {
        beforeEach(() => {
            context = { isMobile: true };
            wrap.dive().setContext(context);
        });

        it('should render setting tabs with position top', () => {
            expect(
                wrap
                    .dive()
                    .find('Memo(SettingTabsPure)')
                    .exists()
            ).toBeTruthy();
            expect(
                wrap
                    .dive()
                    .find('Memo(SettingTabsPure)')
                    .props().position
            ).toEqual('top');
        });
    });
});
