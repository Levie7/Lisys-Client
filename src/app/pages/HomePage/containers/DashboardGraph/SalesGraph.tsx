import moment from 'moment';
import * as React from 'react';

import { Lang } from 'src/core/api';

import { DatePicker } from 'src/shared/components/DatePicker';
import { GraphCard, GraphType } from 'src/shared/components/GraphCard';
import { Spin } from 'src/shared/components/Spin';
import { queryList } from 'src/shared/graphql';

import { backgroundColor, borderColor, months, options, salesGraph, salesLabel } from './constants';
import { getSalesDateByPeriod, getSalesPerDay, getSalesPerMonth } from './schema.gql';

export interface SalesGraphProps extends Lang {}

export function SalesGraph({ lang }: SalesGraphProps) {
    let [month, setMonth] = React.useState(moment(moment(), 'MM-YYYY'));
    let [year, setYear] = React.useState(moment(moment(), 'YYYY'));
    let getSalesDates = queryList({ query: getSalesDateByPeriod, variables: { period: month } });
    let getSalesGraphPerDay = queryList({ query: getSalesPerDay, variables: { period: month } });
    let getSalesGraphPerMonth = queryList({ query: getSalesPerMonth, variables: { period: year } });

    if (getSalesDates.loading || getSalesGraphPerDay.loading || getSalesGraphPerMonth.loading)
        return <Spin />;

    let salesPerDayData = handleSalesDataPerDay(getSalesGraphPerDay?.data);
    let salesPerMonthData = handleSalesDataPerMonth(getSalesGraphPerMonth?.data);

    function handleChangeMonthPeriod(value: any) {
        setMonth(value);
    }

    function handleChangeYearPeriod(value: any) {
        setYear(value);
    }

    function handleSalesDataPerDay(data?: any) {
        let salesPerDay = data?.getSalesPerDay;
        let salesDate = getSalesDates.data?.getSalesDateByPeriod;
        let result: any = {
            labels: salesDate,
            datasets: [
                {
                    label: salesLabel.day[lang],
                    data: [],
                    backgroundColor,
                    borderColor,
                },
            ],
        };
        if (!salesPerDay || !salesPerDay.length) {
            return result;
        }

        let salesData: any[] = [];
        let indexResult = 0;
        // eslint-disable-next-line array-callback-return
        salesDate.map((salesDate: string) => {
            let date = parseInt(salesDate);
            if (salesPerDay[indexResult]) {
                let salesDateData = parseInt(salesPerDay[indexResult]._id.split('-')[2]);
                if (date === salesDateData) {
                    salesData.push(salesPerDay[indexResult].grand_total);
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

    function handleSalesDataPerMonth(data?: any) {
        let salesPerMonth = data?.getSalesPerMonth;
        let result: any = {
            labels: months[lang],
            datasets: [
                {
                    label: salesLabel.month[lang],
                    data: [],
                    backgroundColor,
                    borderColor,
                },
            ],
        };
        if (!salesPerMonth || !salesPerMonth.length) {
            return result;
        }

        let salesData: any[] = [];
        let indexResult = 0;
        // eslint-disable-next-line array-callback-return
        months[lang].map((_, index) => {
            if (salesPerMonth[indexResult]) {
                let salesMonth = parseInt(salesPerMonth[indexResult]._id.split('-')[1]);
                if (index + 1 === salesMonth) {
                    salesData.push(salesPerMonth[indexResult].grand_total);
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

    function renderCustomFilterMonth() {
        return (
            <DatePicker
                defaultValue={month}
                format='MM-YYYY'
                onChange={handleChangeMonthPeriod}
                picker='month'
            />
        );
    }

    function renderCustomFilterYear() {
        return (
            <DatePicker
                defaultValue={year}
                format='YYYY'
                onChange={handleChangeYearPeriod}
                picker='year'
            />
        );
    }

    return (
        <div className='d-flex fd-row fj-around mx-8 my-8'>
            {salesGraph.map((sales) => {
                let customFilter = renderCustomFilterYear();
                let data = salesPerMonthData;
                if (sales.period === 'day') {
                    customFilter = renderCustomFilterMonth();
                    data = salesPerDayData;
                }

                return (
                    <GraphCard
                        customFilter={customFilter}
                        data={data}
                        key={sales.period}
                        options={options}
                        title={sales.title[lang]}
                        type={sales.type as GraphType}
                    />
                );
            })}
        </div>
    );
}
