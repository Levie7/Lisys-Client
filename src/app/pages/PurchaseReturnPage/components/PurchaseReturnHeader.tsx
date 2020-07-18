import * as React from 'react';

import { Divider } from 'src/shared/components/Divider';

interface PurchaseReturnHeaderProps {
    date: string;
    no: string;
    supplier: string;
}

export const PurchaseReturnHeader = React.memo<PurchaseReturnHeaderProps>(
    ({ date, no, supplier }) => (
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
