import React from 'react';

import { Page } from 'src/app/shell/Page';

import { SoldMedicine } from 'src/core/api';

import { DateRangePicker } from 'src/shared/components/DatePicker';
import { Excel } from 'src/shared/components/Excel/Excel';
import { ReportCard } from 'src/shared/components/ReportCard';
import { Spin } from 'src/shared/components/Spin';
import { queryForm } from 'src/shared/graphql';
import { getSoldMedicine } from 'src/shared/graphql/Sales/schema.gql';
import {
    formatDate,
    formatDefaultDate,
    formatDefaultMoment,
    formatDefaultNextDate,
    formatDefaultPreviousMoment,
} from 'src/shared/helpers/formatDate';

import {
    soldMedicineExcelColumns,
    soldMedicineExcelFileName,
    soldMedicineExcelSheet,
} from './constants';
import moment from 'moment';

export const SoldMedicineReportPage = () => {
    let [date, setDate] = React.useState({
        end_date: formatDefaultNextDate(formatDate(moment())),
        start_date: formatDefaultDate(formatDate(moment())),
    });
    let querySoldMedicine = queryForm({
        query: getSoldMedicine,
        variables: { payload: { start_date: date.start_date, end_date: date.end_date } },
    });
    if (querySoldMedicine.loading) return <Spin />;

    let medicine = handleData(querySoldMedicine.data);

    function handleData(data?: any) {
        let soldMedicine = data?.getSoldMedicine;
        if (!soldMedicine || !soldMedicine.length) {
            return [];
        }

        return soldMedicine.map((soldMedicine: SoldMedicine) => {
            return {
                code: soldMedicine.medicine!.code,
                name: soldMedicine.medicine!.name,
                date: soldMedicine.date,
                sold: soldMedicine.sold,
            };
        });
    }

    function handleDateRange(_: any, dateString: [string, string]) {
        setDate({
            end_date: formatDefaultNextDate(dateString[1]),
            start_date: formatDefaultDate(dateString[0]),
        });
    }

    return (
        <Page>
            <div className='d-flex fd-row fj-around mx-8 my-8'>
                <ReportCard title='Sold Medicine' url='/sold_medicine'>
                    <DateRangePicker
                        className='w-100'
                        defaultValue={[
                            formatDefaultMoment(date.start_date),
                            formatDefaultPreviousMoment(date.end_date),
                        ]}
                        onChange={handleDateRange}
                        placeholder={['Start Date', 'End Date']}
                    />
                    <div className='d-flex fa-center fd-row mt-4'>
                        <div className='tw-bold mr-4'>Generate Report :</div>
                        <Excel
                            column={soldMedicineExcelColumns}
                            data={medicine}
                            fileName={soldMedicineExcelFileName}
                            sheetName={soldMedicineExcelSheet}
                        />
                    </div>
                </ReportCard>
            </div>
        </Page>
    );
};
