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

import { stockOpnameColumns } from './constants';
import { deleteStockOpname, getStockOpnameList, STOCK_OPNAME_LIST } from './schema.gql';
import { StockOpnameForm } from './StockOpnameForm';

export const StockOpnamePage = () => {
    let storage = createAuthTokenStorage();
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
                header={{ link: '/stock_opname', title: 'Stock Opname' }}
                initSection='stock_opname'
                isCrud
                module='Stock'
                showAction
            >
                {({ action, recordKey, handleRecord, handleResetAction }) =>
                    ['list', 'active', 'inactive'].includes(action!) ? (
                        <MasterList
                            action={action!}
                            auth={storage.getToken()}
                            columns={stockOpnameColumns}
                            customFilter={{
                                components: renderCustomFilter(),
                                value: handleCustomFilter(),
                            }}
                            module='Stock Opname'
                            mutation={{ delete: deleteStockOpname }}
                            query={{
                                list: getStockOpnameList,
                                refetch: STOCK_OPNAME_LIST,
                            }}
                            softDelete
                            handleData={handleData}
                            handleRecord={handleRecord!}
                            handleResetAction={handleResetAction!}
                        />
                    ) : (
                        <StockOpnameForm
                            auth={storage.getToken()}
                            formType={action!}
                            recordKey={recordKey}
                        />
                    )
                }
            </MasterCard>
        </Page>
    );
};
