import moment from 'moment';
import React from 'react';

import { Page } from 'src/app/shell/Page';

import { SalesReturn, SalesReturnData } from 'src/core/api';
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

import { getLanguage } from '../SettingPage/helpers';
import { SalesReturnDetail } from './components/SalesReturnDetail';
import { SalesReturnHeader } from './components/SalesReturnHeader';
import { SalesReturnSummary } from './components/SalesReturnSummary';
import { moduleName, salesReturnColumns, salesReturnForm, title } from './constants';
import { SalesReturnForm } from './SalesReturnForm';
import {
    deleteSalesReturn,
    getSalesReturnById,
    getSalesReturnList,
    SALES_RETURN_LIST,
} from './schema.gql';

export const SalesReturnPage = () => {
    let storage = createAuthTokenStorage();
    let lang = getLanguage();
    let [date, setDate] = React.useState({
        end_date: formatDefaultDate(formatDate(moment())),
        start_date: formatDefaultDate(formatDate(moment())),
    });
    let [readData, setReadData] = React.useState<any>();
    let isMobile = useUIContext().isMobile;

    function handleCustomFilter() {
        return {
            end_date: date.end_date,
            start_date: date.start_date,
        };
    }

    function handleData(data?: any): { list: SalesReturnData[]; total: number } {
        let salesReturn = data?.getSalesReturnList.data;
        let total = data?.getSalesReturnList.total;
        if (!salesReturn || !salesReturn.length) {
            return { list: [], total: 0 };
        }

        return {
            list: salesReturn.map((salesReturn: SalesReturn) => {
                return {
                    key: salesReturn.id!,
                    no: salesReturn.no,
                    date: convertMilisecondsToDate(salesReturn.date),
                    qty_total: salesReturn.qty_total,
                    grand_total: Currency(formatCommaValue(salesReturn.grand_total)),
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

    function handleReadData(data?: any) {
        setReadData(data);

        return data?.getSalesReturnById;
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

    function renderCustomContent() {
        if (!readData) return null;

        let data: SalesReturn = readData.getSalesReturnById;

        return (
            <div className='row'>
                <SalesReturnHeader
                    date={convertMilisecondsToDate(data.date)}
                    lang={lang}
                    no={data.no}
                />
                <SalesReturnDetail data={readData} lang={lang} />
                <div className='col-12'>
                    <SalesReturnSummary
                        lang={lang}
                        grand_total={Currency(formatCommaValue(data.grand_total))}
                        qty_total={data.qty_total}
                    />
                </div>
                <div className='col-12'>
                    <h3>{salesReturnForm.description.label[lang]} : </h3>
                    {data.description}
                </div>
            </div>
        );
    }

    return (
        <Page>
            <MasterCard
                header={{ link: '/sales_return', title }}
                initSection='sales_return'
                isCrud
                lang={lang}
                module={moduleName}
            >
                {({ action, recordKey, handleRecord, handleResetAction, handleShowCreate }) =>
                    ['list'].includes(action!) ? (
                        <MasterList
                            action={action!}
                            auth={storage.getToken()}
                            columns={salesReturnColumns}
                            customContentDrawer={renderCustomContent()}
                            customFilter={{
                                components: renderCustomFilter(),
                                value: handleCustomFilter(),
                            }}
                            lang={lang}
                            module={moduleName}
                            mutation={{
                                delete: deleteSalesReturn,
                            }}
                            query={{
                                list: getSalesReturnList,
                                read: getSalesReturnById,
                                refetch: SALES_RETURN_LIST,
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
                        <SalesReturnForm
                            auth={storage.getToken()}
                            formType={action!}
                            lang={lang}
                            recordKey={recordKey}
                        />
                    )
                }
            </MasterCard>
        </Page>
    );
};
