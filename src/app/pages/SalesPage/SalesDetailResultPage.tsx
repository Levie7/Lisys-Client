import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { SalesDetail } from 'src/core/api';
import { updateCrud } from 'src/core/graphql/crud';

import { formatPresentDate } from 'src/shared/helpers/formatDate';
import { Currency } from 'src/shared/helpers/formatCurrency';
import { formatCommaValue } from 'src/shared/helpers/formatValue';

export const SalesDetailResultPage = ({ history, location }: RouteComponentProps) => {
    let [fetch] = updateCrud();
    let [init, setInit] = React.useState(false);
    React.useEffect(() => {
        if (!init) {
            window.print();
            setInit(true);
        }
    }, [init]);

    if (!location.state) return null;

    let { cashier, change, date, detail, no, payment, total } = location.state;

    if (window.matchMedia) {
        var mediaQueryList = window.matchMedia('print');
        mediaQueryList.addListener(function(mql) {
            if (!mql.matches) {
                if (location.state.list) {
                    fetch({ variables: { payload: { action: 'list', section: 'sales' } } });
                    history.replace('/sales');
                } else {
                    fetch({ variables: { payload: { action: 'create', section: 'sales' } } });
                    history.replace('/sales?create');
                }
            }
        });
    }

    return (
        <div className='p-2'>
            <div>APOTEK HOSANNA</div>
            <div>Palazzo Park blok A 5012, Sidoarjo</div>
            <div>Telp: 031-99031371</div>
            <br />
            <div className='d-flex fj-between'>
                <div>No</div>
                <div>{no}</div>
            </div>
            <div className='d-flex fj-between'>
                <div>Date</div>
                <div>{formatPresentDate(date)}</div>
            </div>
            <div className='d-flex fj-between'>
                <div>Cashier</div>
                <div>{cashier}</div>
            </div>
            <div>--------------------------------------------------------</div>
            {detail.map((detail: SalesDetail) => (
                <div className='d-flex fd-column fj-between' key={detail.medicine!.code}>
                    <div>{detail.medicine!.name}</div>
                    <div className='d-flex fj-between'>
                        <div>
                            {detail.qty} x {Currency(formatCommaValue(detail.sell_price))} =
                        </div>
                        <div>{Currency(formatCommaValue(detail.sub_total))}</div>
                    </div>
                </div>
            ))}
            <div>--------------------------------------------------------</div>
            <div className='d-flex fj-between'>
                <div>Total</div>
                <div>{Currency(formatCommaValue(total))}</div>
            </div>
            <div className='d-flex fj-between'>
                <div>Payment</div>
                <div>{Currency(formatCommaValue(payment))}</div>
            </div>
            <div className='d-flex fj-end'>
                <div>----------------</div>
            </div>
            <div className='d-flex fj-between'>
                <div>Change</div>
                <div>{Currency(formatCommaValue(change))}</div>
            </div>
            <br />
            <div>Barang yang telah dibeli tidak dapat dikembalikan kecuali ada perjanjian</div>
        </div>
    );
};
