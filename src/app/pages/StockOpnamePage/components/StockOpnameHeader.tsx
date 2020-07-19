import * as React from 'react';

import { Lang } from 'src/core/api';

import { Divider } from 'src/shared/components/Divider';

import { stockOpnameForm } from '../constants';

export interface StockOpnameHeaderProps extends Lang {
    date: string;
    no: string;
}

export const StockOpnameHeader = React.memo<StockOpnameHeaderProps>(({ date, lang, no }) => (
    <>
        <div className='col-6'>
            <div className='row'>
                <div className='col-6'>
                    <h3>{stockOpnameForm.no.label[lang]}</h3>
                </div>
                <div className='col-6'>: {no}</div>
            </div>
        </div>
        <div className='col-6'>
            <div className='row'>
                <div className='col-6'>
                    <h3>{stockOpnameForm.date.label[lang]}</h3>
                </div>
                <div className='col-6'>: {date}</div>
            </div>
        </div>
        <Divider />
    </>
));
