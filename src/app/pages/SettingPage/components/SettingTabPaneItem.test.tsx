import { shallow } from 'enzyme';
import React from 'react';

import UIContext, * as UIContextModule from 'src/shared/contexts/UIContext';

import { SettingTabPaneItem } from './SettingTabPaneItem';

describe('SettingTabPaneItem', () => {
    let context = { isMobile: false };
    const props = {
        description: 'description',
        icon: 'icon',
        title: 'title',
    };
    jest.spyOn(UIContextModule, 'useUIContext').mockImplementation(() => context);
    const wrap = shallow(
        <UIContext.Provider value={context}>
            <SettingTabPaneItem {...props} />
        </UIContext.Provider>,
        { context }
    ).dive();

    it('should render setting page component', () => {
        expect(wrap.find('#SettingTabPaneItem').exists()).toBeTruthy();
    });

    describe('when is not mobile site', () => {
        beforeEach(() => {
            context = { isMobile: false };
            wrap.setContext(context);
        });

        it('should render description', () => {
            expect(wrap.find('#description').exists()).toBeTruthy();
        });
    });

    describe('when is mobile site', () => {
        beforeEach(() => {
            context = { isMobile: true };
            wrap.setContext(context);
        });

        it('should not render description', () => {
            expect(wrap.find('#description').exists()).toBeFalsy();
        });
    });
});
