import React from 'react';

import { Page } from 'src/app/shell/Page';

import { Medicine } from 'src/core/api';

import { Excel } from 'src/shared/components/Excel/Excel';
import { ReportCard } from 'src/shared/components/ReportCard';
import { Spin } from 'src/shared/components/Spin';
import { queryForm } from 'src/shared/graphql';
import { getMedicines } from 'src/shared/graphql/Medicine/schema.gql';

import { medicineExcelColumns, medicineExcelFileName, medicineExcelSheet } from './constants';

export const MedicineListReportPage = () => {
    let queryMedicine = queryForm({ query: getMedicines });
    if (queryMedicine.loading) return <Spin />;

    let medicine = handleData(queryMedicine.data);

    function handleData(data?: any) {
        let medicine = data?.getMedicines;
        if (!medicine || !medicine.length) {
            return [];
        }

        return medicine.map((medicine: Medicine) => {
            return {
                code: medicine.code,
                name: medicine.name,
                stock: medicine.stock,
                uom: medicine.uom!.name,
                sell_price: medicine.sell_price,
            };
        });
    }

    return (
        <Page>
            <div className='d-flex fd-row fj-around mx-8 my-8'>
                <ReportCard title='Medicine List' url='/medicine_list'>
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
