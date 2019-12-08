import { Form as AntForm } from 'antd';
import * as React from 'react';

interface FormItemProps {
    label?: React.ReactNode;
}

export class FormItem extends React.Component<FormItemProps> {
    render() {
        let { children, label } = this.props;

        return <AntForm.Item label={label}>{children}</AntForm.Item>;
    }
}
