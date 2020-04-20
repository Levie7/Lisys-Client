import * as React from 'react';

import { Supplier, SupplierData } from 'src/core/api';

import { CrudListTable } from 'src/shared/components/Crud/CrudList/CrudListTable';
import { Spin } from 'src/shared/components/Spin';
import { mutationForm, queryForm } from 'src/shared/graphql';
import { Message } from 'src/shared/utilities/message';
import { Progress } from 'src/shared/utilities/progress';

import { supplierColumns } from './constants';
import { deleteSupplier, getSuppliers, SUPPLIERS, updateManySupplier } from './schema.gql';

interface MasterSupplierListProps {
    action: string;

    handleRecord: (recordKey: string) => void;
    handleResetAction: () => void;
}

export function MasterSupplierList({
    action,
    handleRecord,
    handleResetAction,
}: MasterSupplierListProps) {
    let [selectedRowKeys, selectRowKeys] = React.useState([]);
    let rowSelection = {
        selectedRowKeys,
        onChange: handleSelect,
    };

    let mutation = mutationForm(deleteSupplier, 'delete');
    let mutationAction = mutationForm(updateManySupplier, 'update');
    let query = queryForm({ query: getSuppliers });
    let suppliers = handleData(query.data?.getSuppliers);
    if (mutation.loading || mutationAction.loading || query.loading) return <Spin />;

    if (action !== 'list' && hasSelected()) {
        mutationAction.action({
            refetchQueries: [{ query: SUPPLIERS }],
            variables: {
                payload: { id: selectedRowKeys, status: action },
            },
        });
        handleResetAction();
    } else if (action !== 'list' && !hasSelected()) {
        Message('Select the data first', 'error');
        handleResetAction();
    }

    function handleData(supplier?: Supplier[]): SupplierData[] {
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

    function handleSelect(selectedRowKeys: any) {
        selectRowKeys(selectedRowKeys);
    }

    function hasSelected() {
        return selectedRowKeys.length > 0;
    }

    return (
        <CrudListTable
            columns={supplierColumns}
            data={suppliers}
            handleDelete={handleDelete}
            handleRecord={handleRecord}
            hasStatus
            rowSelection={rowSelection}
        />
    );
}
