import React from 'react';

import { Page } from 'src/app/shell/Page';

import { Purchasing, PurchasingData } from 'src/core/api';
import { createAuthTokenStorage } from 'src/core/graphql/auth';

import { MasterCard } from 'src/shared/components/Master/containers/MasterCard';
import { MasterList } from 'src/shared/components/Master/containers/MasterList';

import { purchaseListColumns } from './constants';
import { PurchaseListForm } from './PurchaseListForm';
import { deletePurchasing, getPurchasingList, PURCHASING_LIST } from './schema.gql';
import { Currency } from 'src/shared/helpers/formatCurrency';
import { formatCommaValue } from 'src/shared/helpers/formatValue';
import { convertMilisecondsToDate } from 'src/shared/helpers/formatDate';

export const PurchaseListPage = () => {
    let storage = createAuthTokenStorage();

    function handleData(data?: any): { list: PurchasingData[]; total: number } {
        let purchasing = data?.getPurchasingList.data;
        let total = data?.getPurchasingList.total;
        if (!purchasing || !purchasing.length) {
            return { list: [], total: 0 };
        }

        return {
            list: purchasing.map((purchasing: Purchasing) => {
                return {
                    key: purchasing.id!,
                    no: purchasing.no,
                    date: convertMilisecondsToDate(purchasing.date),
                    due_date: convertMilisecondsToDate(purchasing.due_date),
                    supplier_name: purchasing.supplier!.name,
                    qty_total: purchasing.qty_total,
                    grand_total: Currency(formatCommaValue(purchasing.grand_total)),
                    credit_total: Currency(formatCommaValue(purchasing.credit_total)),
                    status: purchasing.status,
                };
            }),
            total,
        };
    }

    return (
        <Page>
            <MasterCard
                header={{ link: '/purchase_list', title: 'Purchase' }}
                initSection='purchase'
                module='Purchasing'
            >
                {({ action, recordKey, handleRecord, handleResetAction }) =>
                    ['list'].includes(action) ? (
                        <MasterList
                            action={action}
                            auth={storage.getToken()}
                            columns={purchaseListColumns}
                            mutation={{
                                delete: deletePurchasing,
                            }}
                            query={{
                                list: getPurchasingList,
                                refetch: PURCHASING_LIST,
                            }}
                            softDelete
                            handleData={handleData}
                            handleRecord={handleRecord}
                            handleResetAction={handleResetAction}
                        />
                    ) : (
                        <PurchaseListForm
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
