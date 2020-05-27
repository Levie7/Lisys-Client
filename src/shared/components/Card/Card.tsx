import { Card as AntCard } from 'antd';
import * as React from 'react';

interface CardProps extends React.HTMLAttributes<any> {
    bodyStyle?: React.CSSProperties;
    children?: React.ReactNode;
}

export const Card = React.memo<CardProps>(({ bodyStyle, children, className }) => (
    <AntCard className={className} bodyStyle={bodyStyle}>
        {children}
    </AntCard>
));
