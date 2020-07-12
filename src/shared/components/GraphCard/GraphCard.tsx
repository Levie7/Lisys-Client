import * as React from 'react';
import { Bar, Line } from 'react-chartjs-2';

import { Card } from 'src/shared/components/Card';

require('./GraphCard.sass');

export type GraphType = 'bar' | 'line';

interface GraphCardProps {
    customFilter?: React.ReactNode;
    data: any;
    options?: any;
    title: string;
    type: GraphType;
}

function GraphCardPure({ customFilter, data, options, title, type }: GraphCardProps) {
    function renderChart() {
        switch (type) {
            case 'bar':
                return <Bar data={data} options={options} height={250} width={500} />;
            case 'line':
                return <Line data={data} options={options} height={250} width={500} />;
        }
    }

    return (
        <Card className='GraphCard'>
            <div className='d-flex fa-center fd-row'>
                <div className='d-flex fd-column mr-4'>
                    <div className='GraphCard_Title fg-gray-light mb-6'>{title}</div>
                    <div className='mb-4'>{customFilter}</div>
                    {renderChart()}
                </div>
            </div>
        </Card>
    );
}

export const GraphCard = React.memo(GraphCardPure);
