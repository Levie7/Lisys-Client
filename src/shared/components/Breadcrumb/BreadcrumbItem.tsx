import { Breadcrumb as AntBreadcrumb } from 'antd';
import * as React from 'react';

interface BreadcrumbItemProps {
    href?: string;
}

export class BreadcrumbItem extends React.Component<BreadcrumbItemProps> {
    render() {
        let { children, href } = this.props;

        return <AntBreadcrumb.Item href={href}>{children}</AntBreadcrumb.Item>;
    }
}
