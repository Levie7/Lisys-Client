import moment from 'moment';
import React from 'react';
import { RouteComponentProps } from 'react-router';

import { Page } from 'src/app/shell/Page';

import { Sales, SalesData } from 'src/core/api';
import { createAuthTokenStorage } from 'src/core/graphql/auth';

import { Button } from 'src/shared/components/Button';
import { DateRangePicker } from 'src/shared/components/DatePicker';
import { Icon } from 'src/shared/components/Icon';
import { Link } from 'src/shared/components/Link';
import { MasterCard } from 'src/shared/components/Master/containers/MasterCard';
import { MasterList } from 'src/shared/components/Master/containers/MasterList';
import { useUIContext } from 'src/shared/contexts/UIContext';
import {
    deleteSales,
    getSalesById,
    getSalesList,
    SALES_LIST,
} from 'src/shared/graphql/Sales/schema.gql';
import { Currency } from 'src/shared/helpers/formatCurrency';
import {
    convertMilisecondsToDate,
    formatDate,
    formatDefaultDate,
} from 'src/shared/helpers/formatDate';
import { formatCommaValue } from 'src/shared/helpers/formatValue';
import { classNames } from 'src/shared/utilities/classNames';

import { getLanguage } from '../SettingPage/helpers';
import { SalesDetail } from './components/SalesDetail';
import { SalesHeader } from './components/SalesHeader';
import { SalesSummary } from './components/SalesSummary';
import { moduleName, salesListColumns, title, salesForm, salesButton } from './constants';
import { SalesForm } from './SalesForm';

export const SalesPage = ({ location }: RouteComponentProps) => {
    let storage = createAuthTokenStorage();
    let lang = getLanguage();
    let [readData, setReadData] = React.useState<any>();
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

    function handleReadData(data?: any) {
        setReadData(data);

        return data?.getSalesById;
    }

    function renderCustomContent() {
        if (!readData) return null;

        let data: Sales = readData.getSalesById;
        let date = convertMilisecondsToDate(data.date);

        return (
            <div className='row'>
                <SalesHeader date={date} lang={lang} no={data.no} />
                <SalesDetail data={readData} lang={lang} />
                <div className='col-12'>
                    <SalesSummary
                        amount_total={Currency(formatCommaValue(data.payment_total))}
                        change_total={Currency(formatCommaValue(data.change_total))}
                        isMobile={false}
                        lang={lang}
                        qty_total={data.qty_total}
                        total={Currency(formatCommaValue(data.grand_total))}
                    />
                </div>
                <div className='col-12'>
                    <h3>{salesForm.description.label[lang]} : </h3>
                    {data.description}
                </div>
                <Link
                    to={{
                        pathname: `/sales_report`,
                        state: {
                            cashier: data.created_by!.name,
                            change: data.change_total,
                            date: date,
                            detail: data.detail,
                            list: true,
                            no: data.no,
                            payment: data.payment_total,
                            total: data.grand_total,
                        },
                    }}
                >
                    <Button className='bg-green fg-white' type='default'>
                        {Icon['print']} {salesButton.print[lang]}
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <Page>
            <MasterCard
                header={{ link: '/sales', title }}
                initAction={location.search !== '' ? 'create' : undefined}
                initSection='sales'
                isCrud
                module={moduleName}
            >
                {({ action, handleRecord, handleResetAction, handleShowCreate }) =>
                    ['list'].includes(action!) ? (
                        <MasterList
                            action={action!}
                            auth={storage.getToken()}
                            columns={salesListColumns}
                            customContentDrawer={renderCustomContent()}
                            customFilter={{
                                components: renderCustomFilter(),
                                value: handleCustomFilter(),
                            }}
                            lang={lang}
                            module={moduleName}
                            mutation={{ delete: deleteSales }}
                            query={{
                                list: getSalesList,
                                read: getSalesById,
                                refetch: SALES_LIST,
                            }}
                            softDelete
                            title={title}
                            handleData={handleData}
                            handleReadData={handleReadData}
                            handleRecord={handleRecord!}
                            handleResetAction={handleResetAction!}
                            handleShowCreate={handleShowCreate!}
                        />
                    ) : (
                        <SalesForm auth={storage.getToken()} formType={action!} lang={lang} />
                    )
                }
            </MasterCard>
        </Page>
    );
};
