import * as React from 'react';

import { Lang } from 'src/core/api';

import { Divider } from 'src/shared/components/Divider';

import { purchasePaymentSummary } from '../constants';

interface PurchasePaymentSummaryProps extends Lang {
    credit_total: string;
    payment_total: string;
}

export const PurchasePaymentSummary = React.memo<PurchasePaymentSummaryProps>(
    ({ credit_total, lang, payment_total }) => (
        <>
            <Divider orientation='right'>{purchasePaymentSummary.grand_total[lang]}</Divider>
            <div className='d-flex fj-between'>
                <h3>{purchasePaymentSummary.credit_total[lang]}</h3>
                <div id='credit_total'>{credit_total}</div>
            </div>
            <div className='d-flex fj-between'>
                <h3>{purchasePaymentSummary.payment_total[lang]}</h3>
                <div id='payment_total'>{payment_total}</div>
            </div>
            <Divider />
        </>
    )
);
