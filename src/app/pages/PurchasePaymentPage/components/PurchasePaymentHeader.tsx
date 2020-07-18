import * as React from 'react';

import { Divider } from 'src/shared/components/Divider';

interface PurchasePaymentHeaderProps {
    date: string;
    no: string;
    payment_method: string;
    payment_no: string;
    supplier: string;
}

export const PurchasePaymentHeader = React.memo<PurchasePaymentHeaderProps>(
    ({ date, no, payment_method, payment_no, supplier }) => (
        <>
            <div className='col-6'>
                <div className='row'>
                    <div className='col-6'>
                        <h3>Transaction No</h3>
                    </div>
                    <div className='col-6'>: {no}</div>
                </div>
                <div className='row'>
                    <div className='col-6'>
                        <h3>Supplier</h3>
                    </div>
                    <div className='col-6'>: {supplier}</div>
                </div>
                <div className='row'>
                    <div className='col-6'>
                        <h3>Payment Method</h3>
                    </div>
                    <div className='col-6'>: {payment_method}</div>
                </div>
                <div className='row'>
                    <div className='col-6'>
                        <h3>Payment No</h3>
                    </div>
                    <div className='col-6'>: {payment_no}</div>
                </div>
            </div>
            <div className='col-6'>
                <div className='row'>
                    <div className='col-6'>
                        <h3>Date</h3>
                    </div>
                    <div className='col-6'>: {date}</div>
                </div>
            </div>
            <Divider />
        </>
    )
);
