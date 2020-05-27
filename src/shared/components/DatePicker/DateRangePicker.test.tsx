import { shallow } from 'enzyme';
import moment, { Moment } from 'moment';
import React from 'react';

import { DateRangePicker } from './DateRangePicker';

describe('DateRangePicker', () => {
    let wrap: any;
    const props: {
        className?: string;
        defaultValue?: [Moment | null, Moment | null] | null;
        format?: string | string[];
        placeholder?: [string, string];
        value?: [Moment | null, Moment | null] | null;
        onChange?: (values: any, formatString: [string, string]) => void;
    } = {
        className: 'class',
        defaultValue: [moment(), moment()],
        placeholder: ['start date', 'end date'],
        value: [moment(), moment()],
        onChange: jest.fn(),
    };

    it('should render DateRangePicker', () => {
        wrap = shallow(<DateRangePicker {...props} />);
        expect(wrap.find('RangePicker').exists()).toBeTruthy();
    });
});
