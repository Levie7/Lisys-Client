import * as React from 'react';

import { Medicine, MedicineData } from 'src/core/api';

import { Spin } from 'src/shared/components/Spin';
import { Status } from 'src/shared/components/Status';
import { Column, Table, TableAction } from 'src/shared/components/Table';
import { mutationForm } from 'src/shared/graphql/mutationForm';
import { Delete } from 'src/shared/utilities/delete';
import { ErrorHandler } from 'src/shared/utilities/errors';
import { Message } from 'src/shared/utilities/message';
import { Progress } from 'src/shared/utilities/progress';

import { medicineColumns } from './constants';
import { deleteMedicine, getMedicines, MEDICINES, updateManyMedicine } from '../schema.gql';

interface MedicineListProps {
    action: string;

    handleRecord: (recordKey: string) => void;
    resetAction: () => void;
}

export const MedicineList = React.memo<MedicineListProps>(
    ({ action, handleRecord, resetAction }) => {
        let [selectedRowKeys, selectRowKeys] = React.useState([]);
        let rowSelection = {
            selectedRowKeys,
            onChange: handleSelect,
        };

        let mutation = mutationForm('delete', deleteMedicine);
        let mutationAction = mutationForm('update', updateManyMedicine);
        let query = handleQuery();
        let medicines: MedicineData[] = handleData(query.data?.getMedicines);
        if (mutation.loading || mutationAction.loading || query.loading) return <Spin />;

        if (action !== '' && hasSelected()) {
            mutationAction.action({
                refetchQueries: [{ query: MEDICINES }],
                variables: {
                    payload: { id: selectedRowKeys, status: action },
                },
            });
            resetAction();
        } else if (action !== '' && !hasSelected()) {
            Message('Select the data first', 'error');
            resetAction();
        }

        function handleData(medicine?: Medicine[]) {
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

        function handleQuery() {
            let { data, loading } = getMedicines({
                onError(error: any) {
                    ErrorHandler(error);
                },
            });
            return {
                data,
                loading,
            };
        }

        function handleSelect(selectedRowKeys: any) {
            selectRowKeys(selectedRowKeys);
        }

        function handleUpdate(recordKey: string) {
            handleRecord(recordKey);
        }

        function hasSelected() {
            return selectedRowKeys.length > 0;
        }

        return (
            <Table dataSource={medicines} rowSelection={rowSelection}>
                {medicineColumns.map((column: any) => (
                    <Column dataIndex={column.dataIndex} key={column.key} title={column.title} />
                ))}
                <Column title='Status' key='status' render={(text) => <Status text={text} />} />
                <Column
                    title='Action'
                    key='action'
                    render={(text, record) => (
                        <>
                            <TableAction
                                iconType='edit'
                                record={record}
                                title='Edit'
                                onClick={handleUpdate}
                            />
                            <Delete confirm={handleDelete} recordKey={record} />
                        </>
                    )}
                />
            </Table>
        );
    }
);
