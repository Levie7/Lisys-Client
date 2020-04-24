import React from 'react';

import { Supplier, SupplierData } from 'src/core/api';

import { MasterCard } from 'src/modules/Master/containers/MasterCard';
import { MasterList } from 'src/modules/Master/containers/MasterList';

import { supplierColumns } from './constants';
import { MasterSupplierForm } from './MasterSupplierForm';
import { deleteSupplier, getSuppliers, SUPPLIERS, updateManySupplier } from './schema.gql';

export const MasterSupplierPage = () => {
    function handleData(data?: any): SupplierData[] {
        let supplier = data?.getSuppliers;
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

    return (
        <MasterCard header={{ link: '/category', title: 'Category' }} initSection='category'>
            {({ action, recordKey, handleRecord, handleResetAction }) =>
                ['list', 'active', 'inactive'].includes(action) ? (
                    <MasterList
                        action={action}
                        columns={supplierColumns}
                        mutation={{
                            delete: deleteSupplier,
                            update: updateManySupplier,
                        }}
                        query={{
                            data: getSuppliers,
                            refetch: SUPPLIERS,
                        }}
                        handleData={handleData}
                        handleRecord={handleRecord}
                        handleResetAction={handleResetAction}
                    />
                ) : (
                    <MasterSupplierForm formType={action} recordKey={recordKey} />
                )
            }
        </MasterCard>
    );
};
