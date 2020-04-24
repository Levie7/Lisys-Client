import React from 'react';

import { Medicine, MedicineData } from 'src/core/api';

import { MasterCard } from 'src/modules/Master/containers/MasterCard';
import { MasterList } from 'src/modules/Master/containers/MasterList';

import { medicineColumns } from './constants';
import { MasterMedicineForm } from './MasterMedicineForm';
import { deleteMedicine, getMedicines, MEDICINES, updateManyMedicine } from './schema.gql';

export const MasterMedicinePage = () => {
    function handleData(data?: any): MedicineData[] {
        let medicine = data?.getMedicines;
        if (!medicine || !medicine.length) {
            return [];
        }

        return medicine.map((medicine: Medicine) => {
            return {
                barcode: medicine.barcode,
                buy_price: medicine.buy_price,
                category_name: medicine.category!.name,
                code: medicine.code,
                key: medicine.id!,
                min_stock: medicine.min_stock,
                name: medicine.name,
                sell_price: medicine.sell_price,
                status: medicine.status,
                stock: medicine.stock,
                uom_name: medicine.uom!.name,
                variant_name: medicine.variant!.name,
            };
        });
    }

    return (
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
                            data: getMedicines,
                            refetch: MEDICINES,
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
    );
};
