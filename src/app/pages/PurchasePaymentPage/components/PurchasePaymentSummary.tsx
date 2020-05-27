import * as React from 'react';

import { Divider } from 'src/shared/components/Divider';

interface PurchasePaymentSummaryProps {
    credit_total: string;
    payment_total: string;
}

export const PurchasePaymentSummary = React.memo<PurchasePaymentSummaryProps>(
    ({ credit_total, payment_total }) => (
        <>
            <Divider orientation='right'>Grand Total</Divider>
            <div className='d-flex fj-between'>
                <h1>Credit Total</h1>
                <div id='credit_total'>{credit_total}</div>
            </div>
            <div className='d-flex fj-between'>
                <h1>Payment Total</h1>
                <div id='payment_total'>{payment_total}</div>
            </div>
            <Divider />
        </>
    )
);
