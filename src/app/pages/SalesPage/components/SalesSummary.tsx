import * as React from 'react';

import { Lang } from 'src/core/api';

import { Divider } from 'src/shared/components/Divider';
import { classNames } from 'src/shared/utilities/classNames';
import { salesSummary } from '../constants';

export interface SalesSummaryProps extends Lang {
    amount_total: string;
    change_total: string;
    isMobile: boolean;
    qty_total: number;
    total: string;
}

function SalesSummaryPure({
    amount_total,
    change_total,
    isMobile,
    lang,
    qty_total,
    total,
}: SalesSummaryProps) {
    return (
        <>
            <div
                id='SalesSummary'
                className={classNames('d-flex', isMobile ? 'fd-column-reverse' : '')}
            >
                <div className='col-12 col@md-6'>
                    <Divider orientation='right'>{salesSummary.payment[lang]}</Divider>
                    <div className='d-flex fj-between'>
                        <h3>{salesSummary.paid_total[lang]}</h3>
                        <div id='amount_total'>{amount_total}</div>
                    </div>
                    <div className='d-flex fj-between'>
                        <h3>{salesSummary.change[lang]}</h3>
                        <div id='change_total'>{change_total}</div>
                    </div>
                </div>
                <div className='col-12 col@md-6'>
                    <Divider orientation='right'>{salesSummary.grand_total[lang]}</Divider>
                    <div className='d-flex fj-between'>
                        <h3>{salesSummary.qty_total[lang]}</h3>
                        <div id='qty_total'>{qty_total}</div>
                    </div>
                    <div className='d-flex fj-between'>
                        <h3>{salesSummary.total[lang]}</h3>
                        <div id='total'>{total}</div>
                    </div>
                </div>
            </div>
            <Divider />
        </>
    );
}

export const SalesSummary = React.memo(SalesSummaryPure);
