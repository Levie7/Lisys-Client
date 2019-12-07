import * as React from 'react';
import { Link as LinkRouter, LinkProps as LinkRouterProps } from 'react-router-dom';

interface LinkProps extends LinkRouterProps {
    disabled?: boolean;
}

export class Link extends React.Component<LinkProps> {
    render() {
        let { ...props } = this.props;

        return <LinkRouter {...props} />;
    }
}
