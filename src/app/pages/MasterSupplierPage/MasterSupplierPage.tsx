import React from 'react';

import { Page } from 'src/app/shell/Page';

import { Supplier, SupplierData } from 'src/core/api';
import { createAuthTokenStorage } from 'src/core/graphql/auth';

import { MasterCard } from 'src/shared/components/Master/containers/MasterCard';
import { MasterList } from 'src/shared/components/Master/containers/MasterList';
import {
    deleteSupplier,
    getSupplierById,
    getSupplierList,
    SUPPLIER_LIST,
    updateManySupplier,
} from 'src/shared/graphql/Supplier/schema.gql';

import { getLanguage } from '../SettingPage/helpers';
import { moduleName, supplierColumns, title } from './constants';
import { MasterSupplierForm } from './MasterSupplierForm';

export const MasterSupplierPage = () => {
    let storage = createAuthTokenStorage();
    let lang = getLanguage();

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

    function handleReadData(data?: any) {
        return data?.getSupplierById;
    }

    return (
        <Page>
            <MasterCard
                header={{ link: '/supplier', title }}
                initSection='supplier'
                isCrud
                lang={lang}
                module={moduleName}
                showAction
            >
                {({ action, recordKey, handleRecord, handleResetAction, handleShowCreate }) =>
                    ['list', 'active', 'inactive'].includes(action!) ? (
                        <MasterList
                            action={action!}
                            auth={storage.getToken()}
                            columns={supplierColumns}
                            hasStatus
                            lang={lang}
                            module={moduleName}
                            mutation={{
                                delete: deleteSupplier,
                                update: updateManySupplier,
                            }}
                            query={{
                                list: getSupplierList,
                                read: getSupplierById,
                                refetch: SUPPLIER_LIST,
                            }}
                            title={title}
                            handleData={handleData}
                            handleReadData={handleReadData}
                            handleRecord={handleRecord!}
                            handleResetAction={handleResetAction!}
                            handleShowCreate={handleShowCreate!}
                        />
                    ) : (
                        <MasterSupplierForm
                            auth={storage.getToken()}
                            formType={action!}
                            lang={lang}
                            recordKey={recordKey}
                        />
                    )
                }
            </MasterCard>
        </Page>
    );
};
