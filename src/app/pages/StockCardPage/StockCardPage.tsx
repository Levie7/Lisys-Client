import moment from 'moment';
import React, { useEffect } from 'react';

import { Page } from 'src/app/shell/Page';

import { StockCard, StockCardData } from 'src/core/api';

import { DateRangePicker } from 'src/shared/components/DatePicker';
import { Divider } from 'src/shared/components/Divider';
import { MasterCard } from 'src/shared/components/Master/containers/MasterCard';
import { MasterSearchList } from 'src/shared/components/Master/containers/MasterSearchList';
import { SearchMedicineList } from 'src/shared/containers/SearchMedicineList';
import { useUIContext } from 'src/shared/contexts/UIContext';
import {
    convertMilisecondsToDate,
    formatDate,
    formatDefaultDate,
    formatPresentDate,
} from 'src/shared/helpers/formatDate';
import { usePrevious } from 'src/shared/helpers/usePrevious';
import { classNames } from 'src/shared/utilities/classNames';

import { getLanguage } from '../SettingPage/helpers';
import { stockCardColumns, stockCardSummary } from './constants';
import { getStockCardList } from './schema.gql';

export const StockCardPage = () => {
    let lang = getLanguage();
    let searchMedicine = React.useRef<any>();
    let [date, setDate] = React.useState({
        end_date: formatDefaultDate(formatDate(moment())),
        start_date: formatDefaultDate(formatDate(moment())),
    });
    let [medicine, setMedicine] = React.useState<string | undefined>();
    let [total, setTotal] = React.useState({
        qty_begin: 0,
        qty_ending: 0,
        qty_in: 0,
        qty_out: 0,
    });
    let [isSetTotal, SetIsSetTotal] = React.useState(false);
    let isMobile = useUIContext().isMobile;
    let prevDataMedicine = usePrevious(medicine);
    let prevDataStartDate = usePrevious(date.start_date);
    let prevDataEndDate = usePrevious(date.end_date);

    useEffect(() => {
        if (
            prevDataMedicine !== medicine ||
            prevDataStartDate !== date.start_date ||
            prevDataEndDate !== date.end_date
        ) {
            SetIsSetTotal(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [medicine, date.start_date, date.end_date]);

    function handleBeginStock(): StockCardData {
        return {
            transaction_date: formatPresentDate(date.start_date),
            key: 'begin_stock',
            transaction_no: null,
            tag: 'begin_stock',
            supplier_name: null,
            qty_begin: 0,
            qty_in: 0,
            qty_out: 0,
            qty_ending: 0,
        };
    }

    function handleCustomFilter() {
        return {
            end_date: date.end_date,
            start_date: date.start_date,
            medicine,
        };
    }

    function handleData(data?: any, isLoading?: boolean): { list: StockCardData[]; total: number } {
        let stockCard = data?.getStockCardList.data;
        let balance = 0;
        let qty_begin = 0;
        let qty_in = 0;
        let qty_out = 0;

        if (!isLoading) {
            if (!stockCard || !stockCard.length) {
                if (!isSetTotal) {
                    setTotal({ qty_begin, qty_in, qty_out, qty_ending: balance });
                    SetIsSetTotal(true);
                }
                let emptyList = [];
                emptyList.push(handleBeginStock());

                return { list: emptyList, total: 0 };
            }
            let stockCardList = stockCard.map((stockCard: StockCard) => {
                balance += stockCard.qty_begin + stockCard.qty_in - stockCard.qty_out;
                qty_begin += stockCard.qty_begin;
                qty_in += stockCard.qty_in;
                qty_out += stockCard.qty_out;

                return {
                    transaction_date: convertMilisecondsToDate(stockCard.transaction_date),
                    key: stockCard._id!,
                    transaction_no: stockCard.transaction?.no,
                    tag: stockCard.tag,
                    supplier_name: stockCard.transaction?.supplier?.name,
                    expired_date:
                        stockCard.transaction?.detail &&
                        convertMilisecondsToDate(stockCard.transaction.detail[0].expired_date),
                    batch_no:
                        stockCard.transaction?.detail && stockCard.transaction.detail[0].batch_no,
                    qty_begin: stockCard.qty_begin,
                    qty_in: stockCard.qty_in,
                    qty_out: stockCard.qty_out,
                    qty_ending: balance,
                };
            });

            if (!isSetTotal) {
                setTotal({ qty_begin, qty_in, qty_out, qty_ending: balance });
                SetIsSetTotal(true);
            }

            if (stockCardList[0].tag !== 'begin_stock') {
                stockCardList.unshift(handleBeginStock());
            }

            return {
                list: stockCardList,
                total: 0,
            };
        }

        return { list: [], total: 0 };
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
                    <SearchMedicineList
                        lang={lang}
                        onRecordList={handleMedicineList}
                        ref={searchMedicine}
                    />
                </div>
            </div>
        );
    }

    return (
        <Page>
            <MasterCard
                header={{ link: '/stock_card', title: 'Stock Card' }}
                initSection='stock_card'
                module='Stock'
            >
                {() => (
                    <>
                        <Divider />
                        <MasterSearchList
                            customFilter={{
                                components: renderCustomFilter(),
                                value: handleCustomFilter(),
                            }}
                            columns={stockCardColumns}
                            lang={lang}
                            query={getStockCardList}
                            handleData={handleData}
                        />
                        <Divider orientation='right'>Total</Divider>
                        <div className='d-flex fj-between'>
                            <h3>{stockCardSummary.stock_in[lang]}</h3>
                            <div id='qty_in'>{total.qty_in}</div>
                        </div>
                        <div className='d-flex fj-between'>
                            <h3>{stockCardSummary.stock_out[lang]}</h3>
                            <div id='qty_out'>{total.qty_out}</div>
                        </div>
                        <div className='d-flex fj-between'>
                            <h3>{stockCardSummary.stock_begin[lang]}</h3>
                            <div id='qty_begin'>{total.qty_begin}</div>
                        </div>
                        <div className='d-flex fj-between'>
                            <h3>{stockCardSummary.stock_ending[lang]}</h3>
                            <div id='qty_ending'>{total.qty_ending}</div>
                        </div>
                    </>
                )}
            </MasterCard>
        </Page>
    );
};
