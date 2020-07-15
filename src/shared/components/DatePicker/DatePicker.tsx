import { DatePicker as AntDatePicker } from 'antd';
import { Moment } from 'moment';
import * as React from 'react';

interface DatePickerProps {
    defaultValue?: Moment;
    disabled?: boolean;
    format?: string | string[];
    picker?: any;
    value?: Moment;

    onChange?: (value: Moment | null, dateString: string) => void;
}

export const DatePicker = React.memo<DatePickerProps>(
    ({ defaultValue, disabled, format = 'DD-MM-YYYY', onChange, picker, value }) => (
        <AntDatePicker
            defaultValue={defaultValue}
            disabled={disabled}
            format={format}
            onChange={onChange}
            picker={picker}
            value={value}
        />
    )
);
