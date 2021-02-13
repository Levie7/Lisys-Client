import moment from 'moment';
import * as React from 'react';

import { Lang } from 'src/core/api';

import { DatePicker } from 'src/shared/components/DatePicker';
import { GraphCard, GraphType } from 'src/shared/components/GraphCard';
import { Select } from 'src/shared/components/Select';
import { Spin } from 'src/shared/components/Spin';
import { queryForm, queryList } from 'src/shared/graphql';
import { getSuppliers } from 'src/shared/graphql/Supplier/schema.gql';

import {
    backgroundColor,
    borderColor,
    months,
    options,
    purchasingGraph,
    purchasingLabel,
    purchasingSummaryLabel,
} from './constants';
import { getPurchasingDebtPerMonth, getPurchasingSummaryPerMonth } from './schema.gql';

export interface PurchasingGraphProps extends Lang {}

export function PurchasingGraph({ lang }: PurchasingGraphProps) {
    let [year, setYear] = React.useState(moment(moment(), 'YYYY'));
    let [summaryYear, setSummaryYear] = React.useState(moment(moment(), 'YYYY'));
    let [supplier, setSupplier] = React.useState('');
    let getPurchasingDebtGraphPerMonth = queryList({
        skip: supplier === '',
        query: getPurchasingDebtPerMonth,
        variables: { payload: { period: year, supplier } },
    });
    let getPurchasingSummaryGraphPerMonth = queryList({
        query: getPurchasingSummaryPerMonth,
        variables: { payload: { period: summaryYear } },
    });
    let supplierQuery = queryForm({ query: getSuppliers });
    if (
        getPurchasingDebtGraphPerMonth.loading ||
        getPurchasingSummaryGraphPerMonth.loading ||
        supplierQuery.loading
    )
        return <Spin />;
    let suppliers = supplierQuery.data?.getSuppliers;

    let purchasingDebtPerMonthData = handlePurchasingDebtDataPerMonth(
        getPurchasingDebtGraphPerMonth?.data
    );
    let purchasingSummaryPerMonthData = handlePurchasingSummaryDataPerMonth(
        getPurchasingSummaryGraphPerMonth?.data
    );

    function handleChangeYearPeriod(value: any) {
        setYear(value);
    }

    function handleChangeSummaryYearPeriod(value: any) {
        setSummaryYear(value);
    }

    function handlePurchasingDebtDataPerMonth(data?: any) {
        let purchasingDebtPerMonth = data?.getPurchasingDebtPerMonth;
        let result: any = {
            labels: months[lang],
            datasets: [
                {
                    label: purchasingLabel[lang],
                    data: [],
                    backgroundColor,
                    borderColor,
                },
            ],
        };
        if (!purchasingDebtPerMonth || !purchasingDebtPerMonth.length) {
            return result;
        }

        let salesData: any[] = [];
        let indexResult = 0;
        // eslint-disable-next-line array-callback-return
        months[lang].map((_, index) => {
            if (purchasingDebtPerMonth[indexResult]) {
                let salesMonth = parseInt(purchasingDebtPerMonth[indexResult]._id.split('-')[1]);
                if (index + 1 === salesMonth) {
                    salesData.push(purchasingDebtPerMonth[indexResult].credit_total);
                    indexResult++;
                } else {
                    salesData.push(0);
                }
            } else {
                salesData.push(0);
            }
        });

        result.datasets[0].data = salesData;

        return result;
    }

    function handlePurchasingSummaryDataPerMonth(data?: any) {
        let purchasingSummaryPerMonth = data?.getPurchasingSummaryPerMonth;
        let result: any = {
            labels: months[lang],
            datasets: [
                {
                    label: purchasingSummaryLabel[lang],
                    data: [],
                    backgroundColor,
                    borderColor,
                },
            ],
        };
        if (!purchasingSummaryPerMonth || !purchasingSummaryPerMonth.length) {
            return result;
        }

        let salesData: any[] = [];
        let indexResult = 0;
        // eslint-disable-next-line array-callback-return
        months[lang].map((_, index) => {
            if (purchasingSummaryPerMonth[indexResult]) {
                let salesMonth = parseInt(purchasingSummaryPerMonth[indexResult]._id.split('-')[1]);
                if (index + 1 === salesMonth) {
                    salesData.push(purchasingSummaryPerMonth[indexResult].grand_total);
                    indexResult++;
                } else {
                    salesData.push(0);
                }
            } else {
                salesData.push(0);
            }
        });

        result.datasets[0].data = salesData;

        return result;
    }

    function handleSupplier(value: string) {
        setSupplier(value);
    }

    function renderCustomFilterYear(model: string) {
        let defaultValue = year;
        let onChange = handleChangeYearPeriod;
        let showSelectSupplier = true;
        if (model === 'summary') {
            defaultValue = summaryYear;
            onChange = handleChangeSummaryYearPeriod;
            showSelectSupplier = false;
        }

        return (
            <div className='d-flex'>
                <DatePicker
                    defaultValue={defaultValue}
                    format='YYYY'
                    onChange={onChange}
                    picker='year'
                />
                {showSelectSupplier && (
                    <Select
                        allowClear
                        className='ml-4 w-100'
                        defaultValue={supplier !== '' ? supplier : undefined}
                        onChange={handleSupplier}
                        placeholder='Supplier'
                        showSearch
                    >
                        {suppliers &&
                            suppliers.map((supplier: any) => (
                                <Select.Option key={supplier.id} value={supplier.id}>
                                    {supplier.name}
                                </Select.Option>
                            ))}
                    </Select>
                )}
            </div>
        );
    }

    return (
        <div className='d-flex fd-row fj-around mx-8 my-8'>
            {purchasingGraph.map((purchasing) => (
                <GraphCard
                    customFilter={renderCustomFilterYear(purchasing.model)}
                    data={
                        purchasing.model === 'summary'
                            ? purchasingSummaryPerMonthData
                            : purchasingDebtPerMonthData
                    }
                    key={purchasing.period}
                    options={options}
                    title={purchasing.title[lang]}
                    type={purchasing.type as GraphType}
                />
            ))}
        </div>
    );
}
