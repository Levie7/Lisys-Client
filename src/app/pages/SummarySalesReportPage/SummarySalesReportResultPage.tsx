import moment from 'moment';
import React from 'react';

import { formatFullDateTime, formatPresentDate } from 'src/shared/helpers/formatDate';
import { withQueryParams } from 'src/core/route/withQueryParams';
import { Currency } from 'src/shared/helpers/formatCurrency';
import { formatCommaValue } from 'src/shared/helpers/formatValue';

import { getLanguage } from '../SettingPage/helpers';
import { summarySalesField } from './constants';

interface SummarySalesReportResultPageProps {
    query: { date: string; sold: string; total: string; transaction: string; user: string };
}

export const SummarySalesReportResultPage = withQueryParams(
    ({ query }: SummarySalesReportResultPageProps) => {
        let lang = getLanguage();
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
                <div>{summarySalesField.title[lang]}</div>
                <div>--------------------------------------------------------</div>
                <div className='d-flex fj-between'>
                    <div>{summarySalesField.user[lang]}</div>
                    <div>{query.user}</div>
                </div>
                <div className='d-flex fj-between'>
                    <div>{summarySalesField.date[lang]}</div>
                    <div>{formatPresentDate(query.date)}</div>
                </div>
                <div>--------------------------------------------------------</div>
                <div className='d-flex fj-between'>
                    <div>{summarySalesField.total_medicine[lang]}</div>
                    <div>{query.sold}</div>
                </div>
                <div className='d-flex fj-between'>
                    <div>{summarySalesField.total_transaction[lang]}</div>
                    <div>{query.transaction}</div>
                </div>
                <div className='d-flex fj-between'>
                    <div>{summarySalesField.total[lang]}</div>
                    <div>{Currency(formatCommaValue(query.total))}</div>
                </div>
                <div>
                    {summarySalesField.printed[lang]} : {formatFullDateTime(moment())}
                </div>
            </div>
        );
    }
);
