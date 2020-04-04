import * as React from 'react';

import { Supplier, SupplierData } from 'src/core/api';

import { Spin } from 'src/shared/components/Spin';
import { Status } from 'src/shared/components/Status';
import { Column, Table, TableAction } from 'src/shared/components/Table';
import { mutationForm } from 'src/shared/graphql/mutationForm';
import { Delete } from 'src/shared/utilities/delete';
import { ErrorHandler } from 'src/shared/utilities/errors';
import { Message } from 'src/shared/utilities/message';
import { Progress } from 'src/shared/utilities/progress';

import { supplierColumns } from './constants';
import { deleteSupplier, getSuppliers, SUPPLIERS, updateManySupplier } from '../schema.gql';

interface SupplierListProps {
    action: string;

    handleRecord: (recordKey: string) => void;
    resetAction: () => void;
}

export const SupplierList = React.memo<SupplierListProps>(
    ({ action, handleRecord, resetAction }) => {
        let [selectedRowKeys, selectRowKeys] = React.useState([]);
        let rowSelection = {
            selectedRowKeys,
            onChange: handleSelect,
        };

        let mutation = mutationForm('delete', deleteSupplier);
        let mutationAction = mutationForm('update', updateManySupplier);
        let query = handleQuery();
        let suppliers: SupplierData[] = handleData(query.data?.getSuppliers);
        if (mutation.loading || mutationAction.loading || query.loading) return <Spin />;

        if (action !== '' && hasSelected()) {
            mutationAction.action({
                refetchQueries: [{ query: SUPPLIERS }],
                variables: {
                    payload: { id: selectedRowKeys, status: action },
                },
            });
            resetAction();
        } else if (action !== '' && !hasSelected()) {
            Message('Select the data first', 'error');
            resetAction();
        }

        function handleData(supplier?: Supplier[]) {
            if (!supplier || !supplier.length) {
                return [];
            }

            return supplier.map((supplier: Supplier) => {
                return {
                    account_name: supplier.account_name,
                    account_no: supplier.account_no,
                    address: supplier.address,
                    bank: supplier.bank,
                    city: supplier.city,
                    contact: supplier.contact,
                    email: supplier.email,
                    key: supplier.id!,
                    name: supplier.name,
                    npwp: supplier.npwp,
                    phone: supplier.phone,
                    province: supplier.province,
                    status: supplier.status,
                    zip_code: supplier.zip_code,
                };
            });
        }

        function handleDelete(record: any) {
            Progress(true);

            mutation.action({
                refetchQueries: [{ query: SUPPLIERS }],
                variables: {
                    payload: { id: record.key },
                },
            });
        }

        function handleQuery() {
            let { data, loading } = getSuppliers({
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
            <Table dataSource={suppliers} rowSelection={rowSelection}>
                {supplierColumns.map((column: any) => (
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
