import moment from 'moment';
import React from 'react';

import { Page } from 'src/app/shell/Page';

import { createAuthTokenStorage } from 'src/core/graphql/auth';

import { DateRangePicker } from 'src/shared/components/DatePicker';
import { MasterCard } from 'src/shared/components/Master/containers/MasterCard';
import { MasterList } from 'src/shared/components/Master/containers/MasterList';
import { handlePurchasingData } from 'src/shared/components/Purchasing/helpers';
import { Select } from 'src/shared/components/Select';
import { Spin } from 'src/shared/components/Spin';
import { useUIContext } from 'src/shared/contexts/UIContext';
import { queryForm } from 'src/shared/graphql';
import {
    deletePurchasing,
    getPurchasingList,
    PURCHASING_LIST,
} from 'src/shared/graphql/Purchasing/schema.gql';
import { getSuppliers } from 'src/shared/graphql/Supplier/schema.gql';
import { formatDate, formatDefaultDate } from 'src/shared/helpers/formatDate';
import { classNames } from 'src/shared/utilities/classNames';

import { purchaseListColumns } from './constants';
import { PurchaseListForm } from './PurchaseListForm';

export const PurchaseListPage = () => {
    let storage = createAuthTokenStorage();
    let [date, setDate] = React.useState({
        end_date: formatDefaultDate(formatDate(moment())),
        start_date: formatDefaultDate(formatDate(moment())),
    });
    let [supplier, setSupplier] = React.useState('');
    let isMobile = useUIContext().isMobile;
    let supplierQuery = queryForm({ query: getSuppliers });
    if (supplierQuery.loading) return <Spin />;
    let suppliers = supplierQuery.data?.getSuppliers;

    function handleCustomFilter() {
        return {
            end_date: date.end_date,
            start_date: date.start_date,
            supplier,
        };
    }

    function handleDateRange(_: any, dateString: [string, string]) {
        setDate({
            end_date: formatDefaultDate(dateString[1]),
            start_date: formatDefaultDate(dateString[0]),
        });
    }

    function handleSupplier(value: string) {
        setSupplier(value);
    }

    function renderCustomFilter() {
        return (
            <div className={classNames('d-flex w-50', isMobile ? 'w-100' : '')}>
                <DateRangePicker
                    className='w-100'
                    defaultValue={[moment(), moment()]}
                    onChange={handleDateRange}
                    placeholder={['Start Date', 'End Date']}
                />
                <Select
                    allowClear
                    className='ml-4 w-100'
                    onChange={handleSupplier}
                    placeholder='Supplier'
                    showSearch
                >
                    {suppliers &&
                        suppliers.map((supplier: any) => (
                            <Select.Option key={supplier.id} value={supplier.id}>
                                {supplier.name}
                            </Select.Option>
                        ))}
                </Select>
            </div>
        );
    }

    return (
        <Page>
            <MasterCard
                header={{ link: '/purchase_list', title: 'Purchase' }}
                initSection='purchase'
                isCrud
                module='Purchasing'
            >
                {({ action, recordKey, handleRecord, handleResetAction }) =>
                    ['list'].includes(action!) ? (
                        <MasterList
                            action={action!}
                            auth={storage.getToken()}
                            columns={purchaseListColumns}
                            customFilter={{
                                components: renderCustomFilter(),
                                value: handleCustomFilter(),
                            }}
                            module='Purchase List'
                            mutation={{ delete: deletePurchasing }}
                            query={{
                                list: getPurchasingList,
                                refetch: PURCHASING_LIST,
                            }}
                            softDelete
                            handleData={handlePurchasingData}
                            handleRecord={handleRecord!}
                            handleResetAction={handleResetAction!}
                        />
                    ) : (
                        <PurchaseListForm
                            auth={storage.getToken()}
                            formType={action!}
                            recordKey={recordKey}
                        />
                    )
                }
            </MasterCard>
        </Page>
    );
};
