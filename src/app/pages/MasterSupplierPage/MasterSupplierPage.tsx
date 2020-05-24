import React from 'react';

import { Page } from 'src/app/shell/Page';

import { Supplier, SupplierData } from 'src/core/api';
import { createAuthTokenStorage } from 'src/core/graphql/auth';

import { MasterCard } from 'src/shared/components/Master/containers/MasterCard';
import { MasterList } from 'src/shared/components/Master/containers/MasterList';

import { supplierColumns } from './constants';
import { MasterSupplierForm } from './MasterSupplierForm';
import { deleteSupplier, getSupplierList, SUPPLIER_LIST, updateManySupplier } from './schema.gql';

export const MasterSupplierPage = () => {
    let storage = createAuthTokenStorage();

    function handleData(data?: any): { list: SupplierData[]; total: number } {
        let supplier = data?.getSupplierList.data;
        let total = data?.getSupplierList.total;
        if (!supplier || !supplier.length) {
            return { list: [], total: 0 };
        }

        return {
            list: supplier.map((supplier: Supplier) => {
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
            }),
            total,
        };
    }

    return (
        <Page>
            <MasterCard
                header={{ link: '/supplier', title: 'Supplier' }}
                initSection='supplier'
                module='Master'
                showAction
            >
                {({ action, recordKey, handleRecord, handleResetAction }) =>
                    ['list', 'active', 'inactive'].includes(action) ? (
                        <MasterList
                            action={action}
                            auth={storage.getToken()}
                            columns={supplierColumns}
                            hasStatus
                            mutation={{
                                delete: deleteSupplier,
                                update: updateManySupplier,
                            }}
                            query={{
                                list: getSupplierList,
                                refetch: SUPPLIER_LIST,
                            }}
                            handleData={handleData}
                            handleRecord={handleRecord}
                            handleResetAction={handleResetAction}
                        />
                    ) : (
                        <MasterSupplierForm
                            auth={storage.getToken()}
                            formType={action}
                            recordKey={recordKey}
                        />
                    )
                }
            </MasterCard>
        </Page>
    );
};
