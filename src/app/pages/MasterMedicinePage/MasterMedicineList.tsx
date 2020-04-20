import * as React from 'react';

import { Medicine, MedicineData } from 'src/core/api';

import { CrudListTable } from 'src/shared/components/Crud/CrudList/CrudListTable';
import { Spin } from 'src/shared/components/Spin';
import { mutationForm, queryForm } from 'src/shared/graphql';
import { Message } from 'src/shared/utilities/message';
import { Progress } from 'src/shared/utilities/progress';

import { medicineColumns } from './constants';
import { deleteMedicine, getMedicines, MEDICINES, updateManyMedicine } from './schema.gql';

interface MasterMedicineListProps {
    action: string;

    handleRecord: (recordKey: string) => void;
    handleResetAction: () => void;
}

export function MasterMedicineList({
    action,
    handleRecord,
    handleResetAction,
}: MasterMedicineListProps) {
    let [selectedRowKeys, selectRowKeys] = React.useState([]);
    let rowSelection = {
        selectedRowKeys,
        onChange: handleSelect,
    };
    let mutation = mutationForm(deleteMedicine, 'delete');
    let mutationAction = mutationForm(updateManyMedicine, 'update');
    let query = queryForm({ query: getMedicines });
    let medicines = handleData(query.data?.getMedicines);
    if (mutation.loading || mutationAction.loading || query.loading) return <Spin />;

    if (action !== 'list' && hasSelected()) {
        mutationAction.action({
            refetchQueries: [{ query: MEDICINES }],
            variables: {
                payload: { id: selectedRowKeys, status: action },
            },
        });
        handleResetAction();
    } else if (action !== 'list' && !hasSelected()) {
        Message('Select the data first', 'error');
        handleResetAction();
    }

    function handleData(medicine?: Medicine[]): MedicineData[] {
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

    function handleDelete(record: any) {
        Progress(true);

        mutation.action({
            refetchQueries: [{ query: MEDICINES }],
            variables: {
                payload: { id: record.key },
            },
        });
    }

    function handleSelect(selectedRowKeys: any) {
        selectRowKeys(selectedRowKeys);
    }

    function hasSelected() {
        return selectedRowKeys.length > 0;
    }

    return (
        <CrudListTable
            columns={medicineColumns}
            data={medicines}
            handleDelete={handleDelete}
            handleRecord={handleRecord}
            hasStatus
            rowSelection={rowSelection}
        />
    );
}
