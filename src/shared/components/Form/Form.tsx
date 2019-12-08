import { Form as AntForm } from 'antd';
import * as React from 'react';

import { FormItem } from './FormItem';

export class Form extends React.Component<{}> {
    static Item: typeof FormItem;

    render() {
        let { children, ...props } = this.props;

        return <AntForm {...props}>{children}</AntForm>;
    }
}
Form.Item = AntForm.Item;
