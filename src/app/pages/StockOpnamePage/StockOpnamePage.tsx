import moment from 'moment';
import React from 'react';

import { Page } from 'src/app/shell/Page';

import { StockOpname, StockOpnameData } from 'src/core/api';
import { createAuthTokenStorage } from 'src/core/graphql/auth';

import { DateRangePicker } from 'src/shared/components/DatePicker';
import { MasterCard } from 'src/shared/components/Master/containers/MasterCard';
import { MasterList } from 'src/shared/components/Master/containers/MasterList';
import { useUIContext } from 'src/shared/contexts/UIContext';
import {
    convertMilisecondsToDate,
    formatDate,
    formatDefaultDate,
} from 'src/shared/helpers/formatDate';
import { classNames } from 'src/shared/utilities/classNames';

import { getLanguage } from '../SettingPage/helpers';
import { StockOpnameDetail } from './components/StockOpnameDetail';
import { StockOpnameHeader } from './components/StockOpnameHeader';
import { moduleName, stockOpnameColumns, title, stockOpnameForm } from './constants';
import {
    deleteStockOpname,
    getStockOpnameById,
    getStockOpnameList,
    STOCK_OPNAME_LIST,
} from './schema.gql';
import { StockOpnameForm } from './StockOpnameForm';

export const StockOpnamePage = () => {
    let storage = createAuthTokenStorage();
    let lang = getLanguage();
    let [readData, setReadData] = React.useState<any>();
    let [date, setDate] = React.useState({
        end_date: formatDefaultDate(formatDate(moment())),
        start_date: formatDefaultDate(formatDate(moment())),
    });
    let isMobile = useUIContext().isMobile;

    function handleData(data?: any): { list: StockOpnameData[]; total: number } {
        let stockOpname = data?.getStockOpnameList.data;
        let total = data?.getStockOpnameList.total;
        if (!stockOpname || !stockOpname.length) {
            return { list: [], total: 0 };
        }

        return {
            list: stockOpname.map((stockOpname: StockOpname) => {
                return {
                    key: stockOpname.id!,
                    no: stockOpname.no,
                    date: convertMilisecondsToDate(stockOpname.date),
                };
            }),
            total,
        };
    }

    function handleCustomFilter() {
        return {
            end_date: date.end_date,
            start_date: date.start_date,
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

        return data?.getStockOpnameById;
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

        let data: StockOpname = readData.getStockOpnameById;

        return (
            <div className='row'>
                <StockOpnameHeader
                    date={convertMilisecondsToDate(data.date)}
                    lang={lang}
                    no={data.no}
                />
                <StockOpnameDetail data={readData} lang={lang} />
                <div className='col-12'>
                    <h3>{stockOpnameForm.description.label[lang]} : </h3>
                    {data.description}
                </div>
            </div>
        );
    }

    return (
        <Page>
            <MasterCard
                header={{ link: '/stock_opname', title }}
                initSection='stock_opname'
                isCrud
                module={moduleName}
                showAction
            >
                {({ action, recordKey, handleRecord, handleResetAction, handleShowCreate }) =>
                    ['list', 'active', 'inactive'].includes(action!) ? (
                        <MasterList
                            action={action!}
                            auth={storage.getToken()}
                            columns={stockOpnameColumns}
                            customContentDrawer={renderCustomContent()}
                            customFilter={{
                                components: renderCustomFilter(),
                                value: handleCustomFilter(),
                            }}
                            lang={lang}
                            module={moduleName}
                            mutation={{ delete: deleteStockOpname }}
                            query={{
                                list: getStockOpnameList,
                                read: getStockOpnameById,
                                refetch: STOCK_OPNAME_LIST,
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
                        <StockOpnameForm
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
