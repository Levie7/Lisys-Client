import moment from 'moment';
import React from 'react';
import { RouteComponentProps } from 'react-router';

import { Page } from 'src/app/shell/Page';

import { Sales, SalesData } from 'src/core/api';
import { createAuthTokenStorage } from 'src/core/graphql/auth';

import { DateRangePicker } from 'src/shared/components/DatePicker';
import { MasterCard } from 'src/shared/components/Master/containers/MasterCard';
import { MasterList } from 'src/shared/components/Master/containers/MasterList';
import { useUIContext } from 'src/shared/contexts/UIContext';
import { Currency } from 'src/shared/helpers/formatCurrency';
import {
    convertMilisecondsToDate,
    formatDate,
    formatDefaultDate,
} from 'src/shared/helpers/formatDate';
import { formatCommaValue } from 'src/shared/helpers/formatValue';
import { classNames } from 'src/shared/utilities/classNames';

import { salesListColumns } from './constants';
import { deleteSales, getSalesList, SALES_LIST } from './schema.gql';
import { SalesForm } from './SalesForm';

export const SalesPage = ({ location }: RouteComponentProps) => {
    let storage = createAuthTokenStorage();
    let [date, setDate] = React.useState({
        end_date: formatDefaultDate(formatDate(moment())),
        start_date: formatDefaultDate(formatDate(moment())),
    });
    let isMobile = useUIContext().isMobile;

    function handleCustomFilter() {
        return {
            end_date: date.end_date,
            start_date: date.start_date,
        };
    }

    function handleData(data?: any): { list: SalesData[]; total: number } {
        let sales = data?.getSalesList.data;
        let total = data?.getSalesList.total;
        if (!sales || !sales.length) {
            return { list: [], total: 0 };
        }

        return {
            list: sales.map((sales: Sales) => {
                return {
                    key: sales.id!,
                    no: sales.no,
                    date: convertMilisecondsToDate(sales.date),
                    qty_total: sales.qty_total,
                    grand_total: Currency(formatCommaValue(sales.grand_total)),
                    payment_total: Currency(formatCommaValue(sales.payment_total)),
                    change_total: Currency(formatCommaValue(sales.change_total)),
                };
            }),
            total,
        };
    }

    function handleDateRange(_: any, dateString: [string, string]) {
        setDate({
            end_date: formatDefaultDate(dateString[1]),
            start_date: formatDefaultDate(dateString[0]),
        });
    }

    function renderCustomFilter() {
        return (
            <div className={classNames('d-flex w-50', isMobile ? 'w-100' : '')}>
                <DateRangePicker
                    className='w-100'
                    defaultValue={[moment(), moment()]}
                    onChange={handleDateRange}
                    placeholder={['Start Date', 'End Date']}
                />
            </div>
        );
    }

    return (
        <Page>
            <MasterCard
                header={{ link: '/sales', title: 'Sales' }}
                initAction={location.search !== '' ? 'create' : undefined}
                initSection='sales'
                isCrud
                module='Sales'
            >
                {({ action, handleRecord, handleResetAction }) =>
                    ['list'].includes(action!) ? (
                        <MasterList
                            action={action!}
                            auth={storage.getToken()}
                            columns={salesListColumns}
                            customFilter={{
                                components: renderCustomFilter(),
                                value: handleCustomFilter(),
                            }}
                            module='Sales'
                            mutation={{ delete: deleteSales }}
                            query={{
                                list: getSalesList,
                                refetch: SALES_LIST,
                            }}
                            softDelete
                            handleData={handleData}
                            handleRecord={handleRecord!}
                            handleResetAction={handleResetAction!}
                        />
                    ) : (
                        <SalesForm auth={storage.getToken()} formType={action!} />
                    )
                }
            </MasterCard>
        </Page>
    );
};
