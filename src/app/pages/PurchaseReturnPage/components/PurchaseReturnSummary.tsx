import * as React from 'react';

import { Lang } from 'src/core/api';

import { Divider } from 'src/shared/components/Divider';
import { purchaseReturnSummary } from '../constants';

interface PurchaseReturnSummaryProps extends Lang {
    cash_total: string;
    credit_discount_total: string;
    qty_total: number;
    grand_total: string;
}

export const PurchaseReturnSummary = React.memo<PurchaseReturnSummaryProps>(
    ({ cash_total, credit_discount_total, lang, grand_total, qty_total }) => (
        <>
            <Divider orientation='right'>{purchaseReturnSummary.grand_total[lang]}</Divider>
            <div className='d-flex fj-between'>
                <h3>{purchaseReturnSummary.qty_total[lang]}</h3>
                <div id='qty_total'>{qty_total}</div>
            </div>
            <div className='d-flex fj-between'>
                <h3>{purchaseReturnSummary.cash_total[lang]}</h3>
                <div id='cash_total'>{cash_total}</div>
            </div>
            <div className='d-flex fj-between'>
                <h3>{purchaseReturnSummary.credit_total[lang]}</h3>
                <div id='credit_discount_total'>{credit_discount_total}</div>
            </div>
            <div className='d-flex fj-between'>
                <h3>{purchaseReturnSummary.total[lang]}</h3>
                <div id='total'>{grand_total}</div>
            </div>
            <Divider />
        </>
    )
);
