import { Form as AntForm } from 'antd';
import * as React from 'react';

import { WrappedFormUtils } from './interfaces';
import { FormItem } from './FormItem';

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
    form?: WrappedFormUtils;
    onSubmit?: (event?: React.FormEvent<HTMLFormElement>) => void;
}

export class Form extends React.Component<FormProps> {
    static create: any;
    static Item: typeof FormItem;

    render() {
        let { children, onSubmit, ...props } = this.props;

        return (
            <AntForm onSubmit={onSubmit} {...props}>
                {children}
            </AntForm>
        );
    }
}
Form.Item = AntForm.Item;
Form.create = AntForm.create;
