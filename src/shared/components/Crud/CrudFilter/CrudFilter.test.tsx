import { shallow } from 'enzyme';
import React from 'react';

import UIContext, * as UIContextModule from 'src/shared/contexts/UIContext';

import { CrudFilter } from './CrudFilter';

describe('CrudFilter', () => {
    let context = { isMobile: false };
    const props = {
        customFilter: <>Filter</>,
        showSearch: true,
        onChange: jest.fn(),
    };
    jest.spyOn(UIContextModule, 'useUIContext').mockImplementation(() => context);
    const wrap = shallow(
        <UIContext.Provider value={context}>
            <CrudFilter {...props} />
        </UIContext.Provider>,
        { context }
    ).dive();

    it('should render crud filter', () => {
        expect(wrap.find('#CrudFilter').exists()).toBeTruthy();
    });

    describe('when is not mobile site', () => {
        beforeEach(() => {
            context = { isMobile: false };
            wrap.setContext(context);
        });

        it('should render search with class width-25', () => {
            expect(wrap.find('#Search').props().className).toEqual('w-25');
        });
    });

    describe('when is mobile site', () => {
        beforeEach(() => {
            context = { isMobile: true };
            wrap.setContext(context);
        });

        it('should not render search with class width-100', () => {
            expect(wrap.find('#Search').props().className).toEqual('mt-2 w-100');
        });
    });
});
