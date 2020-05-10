import { Card as AntCard } from 'antd';
import * as React from 'react';

import { classNames } from 'src/shared/utilities/classNames';

interface CardProps {
    bodyStyle?: React.CSSProperties;
    children?: React.ReactNode;
    className?: string;
}

require('./Card.sass');

export const Card = React.memo<CardProps>(({ bodyStyle, children, className }) => (
    <AntCard className={classNames('Card', className)} bodyStyle={bodyStyle}>
        {children}
    </AntCard>
));
