import moment from 'moment';
import React from 'react';

import { Page } from 'src/app/shell/Page';

import { SummarySales } from 'src/core/api';

import { Button } from 'src/shared/components/Button';
import { DatePicker } from 'src/shared/components/DatePicker';
import { Link } from 'src/shared/components/Link';
import { ReportCard } from 'src/shared/components/ReportCard';
import { Spin } from 'src/shared/components/Spin';
import { queryForm } from 'src/shared/graphql';
import { createAuthTokenStorage } from 'src/core/graphql/auth';
import { getSummarySalesByUser } from 'src/shared/graphql/Sales/schema.gql';
import { getUserByUsername } from 'src/shared/graphql/User/schema.gql';
import {
    formatDate,
    formatDefaultDate,
    formatDefaultMoment,
    formatDefaultNextDate,
} from 'src/shared/helpers/formatDate';

import { getLanguage } from '../SettingPage/helpers';
import { summarySalesButton, summarySalesTitle } from './constants';

export const SummarySalesReportPage = () => {
    let lang = getLanguage();
    let storage = createAuthTokenStorage();
    let [date, setDate] = React.useState({
        end_date: formatDefaultNextDate(formatDate(moment())),
        start_date: formatDefaultDate(formatDate(moment())),
    });
    let queryUser = queryForm({
        query: getUserByUsername,
        variables: { username: storage.getToken() },
    });
    let user = queryUser.data?.getUserByUsername;
    let querySummarySales = queryForm({
        skip: !user,
        query: getSummarySalesByUser,
        variables: {
            payload: {
                created_by: user && user.id,
                start_date: date.start_date,
                end_date: date.end_date,
            },
        },
    });
    if (queryUser.loading || querySummarySales.loading) return <Spin />;

    let summarySales: SummarySales = querySummarySales.data?.getSummarySalesByUser;

    function handleDateRange(_: any, dateString: string) {
        setDate({
            end_date: formatDefaultNextDate(dateString),
            start_date: formatDefaultDate(dateString),
        });
    }

    return (
        <Page>
            <div className='d-flex fd-row fj-around mx-8 my-8'>
                <ReportCard title='Summary Sales' url='/summary_sales'>
                    <DatePicker
                        defaultValue={formatDefaultMoment(date.start_date)}
                        onChange={handleDateRange}
                    />
                    <div className='d-flex fa-center fd-row mt-4'>
                        <div className='tw-bold mr-4'>{summarySalesTitle[lang]} :</div>
                        <Link
                            target='_blank'
                            // eslint-disable-next-line max-len
                            to={`/summary_sales_report?user=${user.name}&date=${summarySales.date}&sold=${summarySales.sold}&transaction=${summarySales.transaction}&total=${summarySales.grand_total}`}
                        >
                            <Button type='default'>{summarySalesButton[lang]}</Button>
                        </Link>
                    </div>
                </ReportCard>
            </div>
        </Page>
    );
};
