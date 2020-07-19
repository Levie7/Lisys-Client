import * as React from 'react';

import { Lang } from 'src/core/api';

import { Divider } from 'src/shared/components/Divider';
import { purchaseForm } from '../constants';

export interface PurchaseHeaderProps extends Lang {
    date: string;
    due_date: string;
    no: string;
    supplier: string;
}

export const PurchaseHeader = React.memo<PurchaseHeaderProps>(
    ({ date, due_date, lang, no, supplier }) => (
        <>
            <div className='col-6'>
                <div className='row'>
                    <div className='col-6'>
                        <h3>{purchaseForm.no.label[lang]}</h3>
                    </div>
                    <div className='col-6'>: {no}</div>
                </div>
                <div className='row'>
                    <div className='col-6'>
                        <h3>{purchaseForm.supplier.label[lang]}</h3>
                    </div>
                    <div className='col-6'>: {supplier}</div>
                </div>
            </div>
            <div className='col-6'>
                <div className='row'>
                    <div className='col-6'>
                        <h3>{purchaseForm.date.label[lang]}</h3>
                    </div>
                    <div className='col-6'>: {date}</div>
                </div>
                <div className='row'>
                    <div className='col-6'>
                        <h3>{purchaseForm.due_date.label[lang]}</h3>
                    </div>
                    <div className='col-6'>: {due_date}</div>
                </div>
            </div>
            <Divider />
        </>
    )
);
