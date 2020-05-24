import { mount } from 'enzyme';
import React from 'react';

import { Select } from './Select';

describe('Select', () => {
    let wrap: any;
    const props = {
        defaultValue: 'Orange',
        showSearch: true,
        onChange: jest.fn(),
    };
    it('should render Select', () => {
        wrap = mount(
            <Select {...props}>
                <Select.Option value='Apple'>Apple</Select.Option>
                <Select.Option value='Orange'>Orange</Select.Option>
            </Select>
        );
        expect(wrap.find('Select').exists()).toBeTruthy();
    });

    describe('when search apple', () => {
        beforeEach(() => {
            wrap.find('input#rc_select_TEST_OR_SSR').simulate('change', {
                target: { value: 'apple' },
            });
        });

        it('should return option contains apple', () => {
            expect(wrap.find('List').props().data.length).toEqual(1);
        });
    });
});
