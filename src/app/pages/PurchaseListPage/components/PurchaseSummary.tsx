import * as React from 'react';

import { Lang } from 'src/core/api';

import { Divider } from 'src/shared/components/Divider';

import { purchaseSummary } from '../constants';

interface PurchaseSummaryProps extends Lang {
    credit_total: string;
    qty_total: number;
    total: string;
}

export const PurchaseSummary = React.memo<PurchaseSummaryProps>(
    ({ credit_total, lang, qty_total, total }) => (
        <>
            <Divider orientation='right'>{purchaseSummary.grand_total[lang]}</Divider>
            <div className='d-flex fj-between'>
                <h3>{purchaseSummary.qty_total[lang]}</h3>
                <div id='qty_total'>{qty_total}</div>
            </div>
            <div className='d-flex fj-between'>
                <h3>{purchaseSummary.total[lang]}</h3>
                <div id='total'>{total}</div>
            </div>
            <div className='d-flex fj-between'>
                <h3>{purchaseSummary.credit_total[lang]}</h3>
                <div id='credit_total'>{credit_total}</div>
            </div>
            <Divider />
        </>
    )
);
