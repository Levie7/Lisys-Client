import * as React from 'react';

import { Lang } from 'src/core/api';

import { Divider } from 'src/shared/components/Divider';
import { purchaseReturnForm } from '../constants';

export interface PurchaseReturnHeaderProps extends Lang {
    date: string;
    no: string;
    supplier: string;
}

export const PurchaseReturnHeader = React.memo<PurchaseReturnHeaderProps>(
    ({ date, lang, no, supplier }) => (
        <>
            <div className='col-6'>
                <div className='row'>
                    <div className='col-6'>
                        <h3>{purchaseReturnForm.no.label[lang]}</h3>
                    </div>
                    <div className='col-6'>: {no}</div>
                </div>
                <div className='row'>
                    <div className='col-6'>
                        <h3>{purchaseReturnForm.supplier.label[lang]}</h3>
                    </div>
                    <div className='col-6'>: {supplier}</div>
                </div>
            </div>
            <div className='col-6'>
                <div className='row'>
                    <div className='col-6'>
                        <h3>{purchaseReturnForm.date.label[lang]}</h3>
                    </div>
                    <div className='col-6'>: {date}</div>
                </div>
            </div>
            <Divider />
        </>
    )
);
