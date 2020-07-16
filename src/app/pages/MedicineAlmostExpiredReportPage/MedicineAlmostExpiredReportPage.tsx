import React from 'react';

import { Page } from 'src/app/shell/Page';

import { MedicineAlmostExpired } from 'src/core/api';

import { Excel } from 'src/shared/components/Excel/Excel';
import { ReportCard } from 'src/shared/components/ReportCard';
import { Spin } from 'src/shared/components/Spin';
import { queryForm } from 'src/shared/graphql';
import { getMedicineAlmostExpired } from 'src/shared/graphql/Medicine/schema.gql';
import { convertMilisecondsToDate } from 'src/shared/helpers/formatDate';

import { medicineExcelColumns, medicineExcelFileName, medicineExcelSheet } from './constants';

export const MedicineAlmostExpiredReportPage = () => {
    let queryMedicine = queryForm({ query: getMedicineAlmostExpired });
    if (queryMedicine.loading) return <Spin />;

    let medicine = handleData(queryMedicine.data);

    function handleData(data?: any) {
        let medicineAlmostExpired = data?.getMedicineAlmostExpired;
        if (!medicineAlmostExpired || !medicineAlmostExpired.length) {
            return [];
        }

        return medicineAlmostExpired.map((medicineAlmostExpired: MedicineAlmostExpired) => {
            return {
                code: medicineAlmostExpired.medicine!.code,
                name: medicineAlmostExpired.medicine!.name,
                supplier: medicineAlmostExpired.supplier!.name,
                expired_date: convertMilisecondsToDate(medicineAlmostExpired.expired_date),
                batch_no: medicineAlmostExpired.batch_no,
            };
        });
    }

    return (
        <Page>
            <div className='d-flex fd-row fj-around mx-8 my-8'>
                <ReportCard title='Medicine Almost Expired' url='/medicine_almost_expired'>
                    <div className='d-flex fa-center fd-row'>
                        <div className='tw-bold mr-4'>Generate Report :</div>
                        <Excel
                            column={medicineExcelColumns}
                            data={medicine}
                            fileName={medicineExcelFileName}
                            sheetName={medicineExcelSheet}
                        />
                    </div>
                </ReportCard>
            </div>
        </Page>
    );
};
