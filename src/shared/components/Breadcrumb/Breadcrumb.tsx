import { Breadcrumb as AntBreadcrumb } from 'antd';
import * as React from 'react';

import { BreadcrumbItem } from './BreadcrumbItem';

export class Breadcrumb extends React.PureComponent<{}> {
    static Item: typeof BreadcrumbItem;

    render() {
        let { children } = this.props;

        return <AntBreadcrumb>{children}</AntBreadcrumb>;
    }
}
Breadcrumb.Item = AntBreadcrumb.Item;
