import moment from 'moment';
import React from 'react';

import { Page } from 'src/app/shell/Page';

import { Purchasing, PurchasingData } from 'src/core/api';

import { DateRangePicker } from 'src/shared/components/DatePicker';
import { Divider } from 'src/shared/components/Divider';
import { MasterCard } from 'src/shared/components/Master/containers/MasterCard';
import { MasterSearchList } from 'src/shared/components/Master/containers/MasterSearchList';
import { SearchMedicineList } from 'src/shared/containers/SearchMedicineList';
import { useUIContext } from 'src/shared/contexts/UIContext';
import { getPurchasingList } from 'src/shared/graphql/Purchasing/schema.gql';
import { Currency } from 'src/shared/helpers/formatCurrency';
import {
    convertMilisecondsToDate,
    formatDate,
    formatDefaultDate,
} from 'src/shared/helpers/formatDate';
import { formatCommaValue } from 'src/shared/helpers/formatValue';
import { classNames } from 'src/shared/utilities/classNames';

import { buyPriceHistoryColumns } from './constants';

export const BuyPriceHistoryPage = () => {
    let searchMedicine = React.useRef<any>();
    let [date, setDate] = React.useState({
        end_date: formatDefaultDate(formatDate(moment())),
        start_date: formatDefaultDate(formatDate(moment())),
    });
    let [medicine, setMedicine] = React.useState('');
    let isMobile = useUIContext().isMobile;

    function handleCustomFilter() {
        return {
            end_date: date.end_date,
            start_date: date.start_date,
            medicine,
        };
    }

    function handleData(data?: any): { list: PurchasingData[]; total: number } {
        let purchasing = data?.getPurchasingList.data;
        let total = data?.getPurchasingList.total;
        if (!purchasing || !purchasing.length) {
            return { list: [], total: 0 };
        }

        return {
            list: purchasing.map((purchasing: Purchasing) => {
                return {
                    key: purchasing.id!,
                    no: purchasing.no,
                    date: convertMilisecondsToDate(purchasing.date),
                    supplier_name: purchasing.supplier!.name,
                    medicine_code: purchasing.supplier!.name,
                    medicine_name: purchasing.supplier!.name,
                    buy_price: Currency(formatCommaValue(2000)),
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

    function handleMedicineList(recordKey: string) {
        setMedicine(recordKey);
        searchMedicine.current.closeList();
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
                <div className='ml-2 w-100'>
                    <SearchMedicineList onRecordList={handleMedicineList} ref={searchMedicine} />
                </div>
            </div>
        );
    }

    return (
        <Page>
            <MasterCard
                header={{ link: '/buy_price_history', title: 'Buy Price History' }}
                initSection='buy_price_history'
                module='Purchasing'
            >
                {() => (
                    <>
                        <Divider />
                        <MasterSearchList
                            customFilter={{
                                components: renderCustomFilter(),
                                value: handleCustomFilter(),
                            }}
                            columns={buyPriceHistoryColumns}
                            query={getPurchasingList}
                            handleData={handleData}
                        />
                    </>
                )}
            </MasterCard>
        </Page>
    );
};
