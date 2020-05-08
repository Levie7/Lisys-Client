import { shallow } from 'enzyme';
import React from 'react';

import { ErrorBoundary } from '../ErrorBoundary';

describe('ErrorBoundary', () => {
    const props = { onError: jest.fn(), renderOnError: jest.fn() };
    const wrapError = shallow(
        <h1 id='error' key='1'>
            Hello
        </h1>
    );
    const wrap = shallow(<ErrorBoundary {...props}>{wrapError}</ErrorBoundary>);
    wrap.simulateError('error');

    it('<ErrorBoundary/> - should render errorBoundary component correctly', () => {
        expect(wrap).toMatchSnapshot();
    });

    it('should setError', () => {
        wrap.setState({ hasError: true });
    });

    describe('when has error', () => {
        beforeEach(() => {
            wrap.setState({ hasError: true });
        });

        it('should render on error', () => {
            expect(wrapError.find('#error').exists()).toBeTruthy();
        });
    });
});
