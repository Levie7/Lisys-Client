import { Form } from 'antd';
import * as React from 'react';

import { Input } from 'src/shared/components/Input';

export const AccountNo = React.memo(() => {
    let [value, setValue] = React.useState('');

    function handleNumeric(e: any) {
        let { value } = e.target;
        let reg = /^-?[0-9]*(\.[0-9]*)?$/;
        if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
            setValue(value);
        }
    }

    return (
        <Form.Item label='Account No' name='account_no'>
            <Input onChange={handleNumeric} value={value} />
        </Form.Item>
    );
});
