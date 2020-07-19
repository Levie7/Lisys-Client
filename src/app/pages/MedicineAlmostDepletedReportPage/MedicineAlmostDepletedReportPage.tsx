import React from 'react';

import { Page } from 'src/app/shell/Page';

import { Medicine } from 'src/core/api';

import { Excel } from 'src/shared/components/Excel/Excel';
import { ReportCard } from 'src/shared/components/ReportCard';
import { Spin } from 'src/shared/components/Spin';
import { queryForm } from 'src/shared/graphql';
import { getMedicineAlmostDepleted } from 'src/shared/graphql/Medicine/schema.gql';

import { getLanguage } from '../SettingPage/helpers';
import {
    medicineExcelColumns,
    medicineExcelFileName,
    medicineExcelSheet,
    medicineTitle,
} from './constants';

export const MedicineAlmostDepletedReportPage = () => {
    let lang = getLanguage();
    let queryMedicine = queryForm({ query: getMedicineAlmostDepleted });
    if (queryMedicine.loading) return <Spin />;

    let medicine = handleData(queryMedicine.data);

    function handleData(data?: any) {
        let medicine = data?.getMedicineAlmostDepleted;
        if (!medicine || !medicine.length) {
            return [];
        }

        return medicine.map((medicine: Medicine) => {
            return {
                code: medicine.code,
                name: medicine.name,
                stock: medicine.stock,
                min_stock: medicine.min_stock,
                sell_price: medicine.sell_price,
            };
        });
    }

    return (
        <Page>
            <div className='d-flex fd-row fj-around mx-8 my-8'>
                <ReportCard title='Medicine Almost Depleted' url='/medicine_almost_depleted'>
                    <div className='d-flex fa-center fd-row'>
                        <div className='tw-bold mr-4'>{medicineTitle[lang]} :</div>
                        <Excel
                            column={medicineExcelColumns[lang]}
                            data={medicine}
                            fileName={medicineExcelFileName[lang]}
                            sheetName={medicineExcelSheet[lang]}
                        />
                    </div>
                </ReportCard>
            </div>
        </Page>
    );
};
