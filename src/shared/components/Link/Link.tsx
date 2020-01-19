import * as React from 'react';
import { Link as LinkRouter, LinkProps as LinkRouterProps } from 'react-router-dom';

interface LinkProps extends LinkRouterProps {
    disabled?: boolean;
}

export const Link = React.memo<LinkProps>(({ ...props }) => <LinkRouter {...props} />);
