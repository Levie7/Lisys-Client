import * as React from 'react';

import { Card } from 'src/shared/components/Card';
import { Icon } from 'src/shared/components/Icon';
import { Currency } from 'src/shared/helpers/formatCurrency';

require('./StatisticCard.sass');

interface StatisticCardProps {
    icon: string;
    title: string;
    value: number | string;
}

function StatisticCardPure({ icon, title, value }: StatisticCardProps) {
    return (
        <Card className='StatisticCard'>
            <div className='d-flex fa-center fd-row'>
                <div className='d-flex fd-column mr-4'>
                    <div className='StatisticCard_Title fg-gray-light'>{title}</div>
                    <div className='StatisticCard_Value fg-green-light fw-bold ta-center'>
                        {Currency(value.toString())}
                    </div>
                </div>
                <div className='StatisticCard_Icon fg-gray-light'>{Icon[icon]}</div>
            </div>
        </Card>
    );
}

export const StatisticCard = React.memo(StatisticCardPure);
