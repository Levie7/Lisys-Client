import * as React from 'react';

import { Lang } from 'src/core/api';

import { Divider } from 'src/shared/components/Divider';
import { salesReturnSummary } from '../constants';

interface SalesReturnSummaryProps extends Lang {
    qty_total: number;
    grand_total: string;
}

export const SalesReturnSummary = React.memo<SalesReturnSummaryProps>(
    ({ lang, grand_total, qty_total }) => (
        <>
            <Divider orientation='right'>{salesReturnSummary.grand_total[lang]}</Divider>
            <div className='d-flex fj-between'>
                <h3>{salesReturnSummary.qty_total[lang]}</h3>
                <div id='qty_total'>{qty_total}</div>
            </div>
            <div className='d-flex fj-between'>
                <h3>{salesReturnSummary.total[lang]}</h3>
                <div id='total'>{grand_total}</div>
            </div>
            <Divider />
        </>
    )
);
