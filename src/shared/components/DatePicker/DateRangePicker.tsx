import { DatePicker as AntDatePicker } from 'antd';
import { Moment } from 'moment';
import * as React from 'react';

interface DateRangePickerProps {
    className?: string;
    defaultValue?: [Moment | null, Moment | null] | null;
    format?: string | string[];
    placeholder?: [string, string];
    value?: [Moment | null, Moment | null] | null;

    onChange?: (values: any, formatString: [string, string]) => void;
}

export const DateRangePicker = React.memo<DateRangePickerProps>(
    ({ className, defaultValue, format = 'DD-MM-YYYY', onChange, placeholder, value }) => (
        <AntDatePicker.RangePicker
            className={className}
            defaultValue={defaultValue}
            format={format}
            onChange={onChange}
            placeholder={placeholder}
            value={value}
        />
    )
);
