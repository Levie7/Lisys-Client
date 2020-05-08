import { shallow } from 'enzyme';
import React from 'react';

import UIContext, * as UIContextModule from 'src/shared/contexts/UIContext';

import { SaveButton } from '../SaveButton';

describe('SaveButton', () => {
    let context = { isMobile: true };
    let wrap: any;
    jest.spyOn(UIContextModule, 'useUIContext').mockImplementation(() => context);
    wrap = shallow(
        <UIContext.Provider value={context}>
            <SaveButton />
        </UIContext.Provider>,
        { context }
    );
    it('should render save button component', () => {
        expect(wrap.find('Memo(SaveButtonPure)').exists()).toBeTruthy();
    });

    describe('when is mobile', () => {
        it('should render SaveButton with class w-100', () => {
            expect(
                wrap
                    .dive()
                    .find('#Save')
                    .props().className
            ).toEqual('w-100');
        });
    });

    describe('when is not mobile', () => {
        beforeEach(() => {
            context = { isMobile: false };
            wrap.dive().setContext(context);
        });

        it('should render SaveButton with empty class', () => {
            expect(
                wrap
                    .dive()
                    .find('#Save')
                    .props().className
            ).toEqual('');
        });
    });
});
