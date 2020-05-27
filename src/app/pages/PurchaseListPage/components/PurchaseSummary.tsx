import * as React from 'react';

import { Divider } from 'src/shared/components/Divider';

interface PurchaseSummaryProps {
    credit_total: string;
    qty_total: number;
    total: string;
}

export const PurchaseSummary = React.memo<PurchaseSummaryProps>(
    ({ credit_total, qty_total, total }) => (
        <>
            <Divider orientation='right'>Grand Total</Divider>
            <div className='d-flex fj-between'>
                <h1>Qty Total</h1>
                <div id='qty_total'>{qty_total}</div>
            </div>
            <div className='d-flex fj-between'>
                <h1>Total</h1>
                <div id='total'>{total}</div>
            </div>
            <div className='d-flex fj-between'>
                <h1>Credit Total</h1>
                <div id='credit_total'>{credit_total}</div>
            </div>
            <Divider />
        </>
    )
);
