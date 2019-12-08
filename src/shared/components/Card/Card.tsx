import { Card as AntCard } from 'antd';
import * as React from 'react';

import { classNames } from 'src/shared/utilities/classNames';

interface CardProps {
    className?: string;
}

require('./Card.sass');
export class Card extends React.Component<CardProps> {
    render() {
        let { children, className } = this.props;

        return <AntCard className={classNames('Card', className)}>{children}</AntCard>;
    }
}
