import * as React from 'react';

import { Card } from 'src/shared/components/Card';
import { Divider } from 'src/shared/components/Divider';
import { MasterContentHeader } from 'src/shared/components/Master/components/MasterContentHeader';

require('./ReportCard.sass');

interface ReportCardProps {
    children?: React.ReactNode;
    title: string;
    url: string;
}

function ReportCardPure({ children, title, url }: ReportCardProps) {
    return (
        <Card className='ReportCard'>
            <div className='d-flex fa-center fd-row'>
                <div className='d-flex fd-column mr-4'>
                    <MasterContentHeader action='back' module='Report' title={title} to={url} />
                    <Divider />
                    {children}
                </div>
            </div>
        </Card>
    );
}

export const ReportCard = React.memo(ReportCardPure);
