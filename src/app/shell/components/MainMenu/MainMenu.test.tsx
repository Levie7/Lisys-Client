import { shallow } from 'enzyme';
import React from 'react';

import UIContext, * as UIContextModule from 'src/shared/contexts/UIContext';

import { MainMenu } from './MainMenu';

describe('MainMenu', () => {
    let context = { isMobile: false };
    let props = {
        auth: 'sa',
        isMenuTop: false,
    };
    jest.spyOn(UIContextModule, 'useUIContext').mockImplementation(() => context);
    let wrap = shallow(
        <UIContext.Provider value={context}>
            <MainMenu {...props} />
        </UIContext.Provider>,
        { context }
    );

    it('should render main menu component', () => {
        expect(wrap.find('Memo(MainMenuPure)').exists()).toBeTruthy();
    });

    describe('when is mobile site', () => {
        beforeEach(() => {
            context = { isMobile: true };
            wrap.dive().setContext(context);
        });

        it('should render menu left', () => {
            expect(
                wrap
                    .dive()
                    .find('MenuLeft')
                    .exists()
            ).toBeTruthy();
        });
    });

    describe('when is not mobile site', () => {
        beforeEach(() => {
            context = { isMobile: false };
            wrap.dive().setContext(context);
        });

        describe('and is menu top', () => {
            beforeEach(() => {
                props = { auth: 'sa', isMenuTop: true };
                wrap = shallow(
                    <UIContext.Provider value={context}>
                        <MainMenu {...props} />
                    </UIContext.Provider>,
                    { context }
                ).dive();
            });

            it('should render menu top', () => {
                expect(wrap.find('Memo(MenuTopPure)').exists()).toBeTruthy();
            });
        });

        describe('and is not menu top', () => {
            beforeEach(() => {
                props = { auth: 'sa', isMenuTop: false };
                wrap = shallow(
                    <UIContext.Provider value={context}>
                        <MainMenu {...props} />
                    </UIContext.Provider>,
                    { context }
                ).dive();
            });

            it('should render menu left', () => {
                expect(wrap.find('MenuLeft').exists()).toBeTruthy();
            });
        });
    });
});
