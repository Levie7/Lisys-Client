import { DatePicker as AntDatePicker } from 'antd';
import { Moment } from 'moment';
import * as React from 'react';

interface DatePickerProps {
    defaultValue?: Moment;
    format?: string | string[];
    value?: Moment;

    onChange?: (value: Moment | null, dateString: string) => void;
}

export const DatePicker = React.memo<DatePickerProps>(
    ({ defaultValue, format = 'DD-MM-YYYY', onChange, value }) => (
        <AntDatePicker
            defaultValue={defaultValue}
            format={format}
            onChange={onChange}
            value={value}
        />
    )
);
