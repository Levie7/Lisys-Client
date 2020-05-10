import React from 'react';

import { Page } from 'src/app/shell/Page';

import { Medicine, MedicineData } from 'src/core/api';

import { MasterCard } from 'src/modules/Master/containers/MasterCard';
import { MasterList } from 'src/modules/Master/containers/MasterList';

import { Currency } from 'src/shared/helpers/formatCurrency';
import { formatCommaValue } from 'src/shared/helpers/formatValue';

import { medicineColumns } from './constants';
import { MasterMedicineForm } from './MasterMedicineForm';
import { deleteMedicine, getMedicineList, MEDICINE_LIST, updateManyMedicine } from './schema.gql';

export const MasterMedicinePage = () => {
    function handleData(data?: any): { list: MedicineData[]; total: number } {
        let medicine = data?.getMedicineList.data;
        let total = data?.getMedicineList.total;
        if (!medicine || !medicine.length) {
            return { list: [], total: 0 };
        }

        return {
            list: medicine.map((medicine: Medicine) => {
                return {
                    barcode: medicine.barcode,
                    buy_price: Currency(formatCommaValue(medicine.buy_price)),
                    category_name: medicine.category!.name,
                    code: medicine.code,
                    key: medicine.id!,
                    min_stock: medicine.min_stock,
                    name: medicine.name,
                    sell_price: Currency(formatCommaValue(medicine.sell_price)),
                    status: medicine.status,
                    stock: medicine.stock,
                    uom_name: medicine.uom!.name,
                    variant_name: medicine.variant!.name,
                };
            }),
            total,
        };
    }

    return (
        <Page>
            <MasterCard header={{ link: '/medicine', title: 'Medicine' }} initSection='medicine'>
                {({ action, recordKey, handleRecord, handleResetAction }) =>
                    ['list', 'active', 'inactive'].includes(action) ? (
                        <MasterList
                            action={action}
                            columns={medicineColumns}
                            mutation={{
                                delete: deleteMedicine,
                                update: updateManyMedicine,
                            }}
                            query={{
                                list: getMedicineList,
                                refetch: MEDICINE_LIST,
                            }}
                            handleData={handleData}
                            handleRecord={handleRecord}
                            handleResetAction={handleResetAction}
                        />
                    ) : (
                        <MasterMedicineForm formType={action} recordKey={recordKey} />
                    )
                }
            </MasterCard>
        </Page>
    );
};
