import moment from 'moment';
import React from 'react';

import { Page } from 'src/app/shell/Page';

import { PurchasePayment, PurchasePaymentData } from 'src/core/api';
import { createAuthTokenStorage } from 'src/core/graphql/auth';

import { DateRangePicker } from 'src/shared/components/DatePicker';
import { MasterCard } from 'src/shared/components/Master/containers/MasterCard';
import { MasterList } from 'src/shared/components/Master/containers/MasterList';
import { Select } from 'src/shared/components/Select';
import { Spin } from 'src/shared/components/Spin';
import { useUIContext } from 'src/shared/contexts/UIContext';
import { queryForm } from 'src/shared/graphql';
import { getSuppliers } from 'src/shared/graphql/Supplier/schema.gql';
import { Currency } from 'src/shared/helpers/formatCurrency';
import {
    convertMilisecondsToDate,
    formatDate,
    formatDefaultDate,
} from 'src/shared/helpers/formatDate';
import { formatCommaValue } from 'src/shared/helpers/formatValue';
import { classNames } from 'src/shared/utilities/classNames';

import { purchasePaymentColumns } from './constants';
import { PurchasePaymentForm } from './PurchasePaymentForm';
import { deletePurchasePayment, getPurchasePaymentList, PURCHASE_PAYMENT_LIST } from './schema.gql';

export const PurchasePaymentPage = () => {
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

    function handleData(data?: any): { list: PurchasePaymentData[]; total: number } {
        let purchasePayment = data?.getPurchasePaymentList.data;
        let total = data?.getPurchasePaymentList.total;
        if (!purchasePayment || !purchasePayment.length) {
            return { list: [], total: 0 };
        }

        return {
            list: purchasePayment.map((purchasePayment: PurchasePayment) => {
                return {
                    key: purchasePayment.id!,
                    no: purchasePayment.no,
                    date: convertMilisecondsToDate(purchasePayment.date),
                    supplier_name: purchasePayment.supplier!.name,
                    payment_method: purchasePayment.payment_method,
                    payment_no: purchasePayment.payment_no,
                    credit_total: Currency(formatCommaValue(purchasePayment.credit_total)),
                    payment_total: Currency(formatCommaValue(purchasePayment.payment_total)),
                };
            }),
            total,
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
                header={{ link: '/purchase_payment', title: 'Purchase Payment' }}
                initSection='purchase_payment'
                isCrud
                module='Purchasing'
            >
                {({ action, recordKey, handleRecord, handleResetAction }) =>
                    ['list'].includes(action!) ? (
                        <MasterList
                            action={action!}
                            auth={storage.getToken()}
                            columns={purchasePaymentColumns}
                            customFilter={{
                                components: renderCustomFilter(),
                                value: handleCustomFilter(),
                            }}
                            mutation={{
                                delete: deletePurchasePayment,
                            }}
                            query={{
                                list: getPurchasePaymentList,
                                refetch: PURCHASE_PAYMENT_LIST,
                            }}
                            softDelete
                            handleData={handleData}
                            handleRecord={handleRecord!}
                            handleResetAction={handleResetAction!}
                        />
                    ) : (
                        <PurchasePaymentForm
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
