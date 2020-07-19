import * as React from 'react';

import { Lang } from 'src/core/api';

import { Divider } from 'src/shared/components/Divider';

import { salesForm } from '../constants';

export interface SalesHeaderProps extends Lang {
    date: string;
    no: string;
}

export const SalesHeader = React.memo<SalesHeaderProps>(({ date, lang, no }) => (
    <>
        <div className='col-6'>
            <div className='row'>
                <div className='col-6'>
                    <h3>{salesForm.no.label[lang]}</h3>
                </div>
                <div className='col-6'>: {no}</div>
            </div>
        </div>
        <div className='col-6'>
            <div className='row'>
                <div className='col-6'>
                    <h3>{salesForm.date.label[lang]}</h3>
                </div>
                <div className='col-6'>: {date}</div>
            </div>
        </div>
        <Divider />
    </>
));
