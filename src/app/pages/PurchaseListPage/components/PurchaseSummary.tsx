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
                <h3>Qty Total</h3>
                <div id='qty_total'>{qty_total}</div>
            </div>
            <div className='d-flex fj-between'>
                <h3>Total</h3>
                <div id='total'>{total}</div>
            </div>
            <div className='d-flex fj-between'>
                <h3>Credit Total</h3>
                <div id='credit_total'>{credit_total}</div>
            </div>
            <Divider />
        </>
    )
);
