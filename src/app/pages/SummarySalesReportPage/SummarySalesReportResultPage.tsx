import moment from 'moment';
import React from 'react';

import { formatFullDateTime, formatPresentDate } from 'src/shared/helpers/formatDate';
import { withQueryParams } from 'src/core/route/withQueryParams';
import { Currency } from 'src/shared/helpers/formatCurrency';
import { formatCommaValue } from 'src/shared/helpers/formatValue';

interface SummarySalesReportResultPageProps {
    query: { date: string; sold: string; total: string; transaction: string; user: string };
}

export const SummarySalesReportResultPage = withQueryParams(
    ({ query }: SummarySalesReportResultPageProps) => {
        let [init, setInit] = React.useState(false);
        if (!init) {
            window.print();
            setInit(true);
        }

        return (
            <div className='p-2'>
                <div>APOTEK HOSANNA</div>
                <div>Palazzo Park blok A 5012, Sidoarjo</div>
                <div>Telp: 031-99031371</div>
                <br />
                <div>Summary Sales</div>
                <div>--------------------------------------------------------</div>
                <div className='d-flex fj-between'>
                    <div>User</div>
                    <div>{query.user}</div>
                </div>
                <div className='d-flex fj-between'>
                    <div>Tanggal</div>
                    <div>{formatPresentDate(query.date)}</div>
                </div>
                <div>--------------------------------------------------------</div>
                <div className='d-flex fj-between'>
                    <div>Total Medicine Sold</div>
                    <div>{query.sold}</div>
                </div>
                <div className='d-flex fj-between'>
                    <div>Total Transaction</div>
                    <div>{query.transaction}</div>
                </div>
                <div className='d-flex fj-between'>
                    <div>Total</div>
                    <div>{Currency(formatCommaValue(query.total))}</div>
                </div>
                <div>Printed at : {formatFullDateTime(moment())}</div>
            </div>
        );
    }
);
