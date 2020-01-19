import { Form as AntForm } from 'antd';
import * as React from 'react';

interface FormItemProps {
    extra?: React.ReactNode;
    label?: React.ReactNode;
}

export class FormItem extends React.PureComponent<FormItemProps> {
    render() {
        let { children, extra, label } = this.props;

        return (
            <AntForm.Item extra={extra} label={label}>
                {children}
            </AntForm.Item>
        );
    }
}
