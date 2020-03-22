import { Card as AntCard } from 'antd';
import * as React from 'react';

import { classNames } from 'src/shared/utilities/classNames';

interface CardProps {
    children?: React.ReactNode;
    className?: string;
}

require('./Card.sass');

export const Card = React.memo<CardProps>(({ children, className }) => (
    <AntCard className={classNames('Card', className)}>{children}</AntCard>
));
