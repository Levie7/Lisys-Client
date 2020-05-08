import { shallow } from 'enzyme';
import React from 'react';

import { PageLoading } from '../PageLoading';

describe('PageLoading', () => {
    const props = {
        isLoading: false,
        pastDelay: false,
        timedOut: false,
        error: undefined,
        retry: jest.fn(),
    };
    const wrap = shallow(<PageLoading {...props} />);

    it('<PageLoading/> - should render pageLoading component correctly', () => {
        expect(wrap).toMatchSnapshot();
    });

    it('should contains memo spin component', () => {
        expect(wrap.find('Memo()').exists()).toBeTruthy();
    });

    it('should throw error', () => {
        let throwError;
        try {
            wrap.setProps({ error: 'error' });
        } catch (error) {
            throwError = error;
        }

        expect(throwError).toEqual('error');
    });
});
