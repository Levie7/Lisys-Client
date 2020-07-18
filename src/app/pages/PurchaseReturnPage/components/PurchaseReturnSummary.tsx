import * as React from 'react';

import { Divider } from 'src/shared/components/Divider';

interface PurchaseReturnSummaryProps {
    cash_total: string;
    credit_discount_total: string;
    qty_total: number;
    grand_total: string;
}

export const PurchaseReturnSummary = React.memo<PurchaseReturnSummaryProps>(
    ({ cash_total, credit_discount_total, grand_total, qty_total }) => (
        <>
            <Divider orientation='right'>Grand Total</Divider>
            <div className='d-flex fj-between'>
                <h3>Qty Total</h3>
                <div id='qty_total'>{qty_total}</div>
            </div>
            <div className='d-flex fj-between'>
                <h3>Cash Total</h3>
                <div id='total'>{cash_total}</div>
            </div>
            <div className='d-flex fj-between'>
                <h3>Credit Total</h3>
                <div id='credit_discount_total'>{credit_discount_total}</div>
            </div>
            <div className='d-flex fj-between'>
                <h3>Total</h3>
                <div id='total'>{grand_total}</div>
            </div>
            <Divider />
        </>
    )
);
