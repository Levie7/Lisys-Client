import { shallow } from 'enzyme';
import React from 'react';

import { Status } from './Status';

describe('Status', () => {
    let wrap: any;
    const props = {
        text: '',
    };
    it('should not render anything', () => {
        wrap = shallow(<Status {...props} />);
        expect(wrap.find('Memo()').exists()).toBeFalsy();
    });

    describe('when status is active', () => {
        beforeEach(() => {
            wrap.setProps({ text: { status: 'active' } });
        });

        it('should render badge with status success', () => {
            expect(wrap.find('Memo()').props().status).toEqual('success');
        });
    });

    describe('when status is inactive', () => {
        beforeEach(() => {
            wrap.setProps({ text: { status: 'inactive' } });
        });

        it('should render badge with status error', () => {
            expect(wrap.find('Memo()').props().status).toEqual('error');
        });
    });
});
