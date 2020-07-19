import moment from 'moment';
import React from 'react';

import { Page } from 'src/app/shell/Page';

import { PurchaseReturn, PurchaseReturnData } from 'src/core/api';
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

import { getLanguage } from '../SettingPage/helpers';
import { PurchaseReturnDetail } from './components/PurchaseReturnDetail';
import { PurchaseReturnHeader } from './components/PurchaseReturnHeader';
import { PurchaseReturnSummary } from './components/PurchaseReturnSummary';
import { moduleName, purchaseReturnColumns, purchaseReturnForm, title } from './constants';
import { PurchaseReturnForm } from './PurchaseReturnForm';
import {
    deletePurchaseReturn,
    getPurchaseReturnById,
    getPurchaseReturnList,
    PURCHASE_RETURN_LIST,
} from './schema.gql';

export const PurchaseReturnPage = () => {
    let storage = createAuthTokenStorage();
    let lang = getLanguage();
    let [date, setDate] = React.useState({
        end_date: formatDefaultDate(formatDate(moment())),
        start_date: formatDefaultDate(formatDate(moment())),
    });
    let [readData, setReadData] = React.useState<any>();
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

    function handleData(data?: any): { list: PurchaseReturnData[]; total: number } {
        let purchaseReturn = data?.getPurchaseReturnList.data;
        let total = data?.getPurchaseReturnList.total;
        if (!purchaseReturn || !purchaseReturn.length) {
            return { list: [], total: 0 };
        }

        return {
            list: purchaseReturn.map((purchaseReturn: PurchaseReturn) => {
                return {
                    key: purchaseReturn.id!,
                    no: purchaseReturn.no,
                    date: convertMilisecondsToDate(purchaseReturn.date),
                    supplier_name: purchaseReturn.supplier!.name,
                    qty_total: purchaseReturn.qty_total,
                    grand_total: Currency(formatCommaValue(purchaseReturn.grand_total)),
                    cash_total: Currency(formatCommaValue(purchaseReturn.cash_total)),
                    credit_discount_total: Currency(
                        formatCommaValue(purchaseReturn.credit_discount_total)
                    ),
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

    function handleReadData(data?: any) {
        setReadData(data);

        return data?.getPurchaseReturnById;
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

    function renderCustomContent() {
        if (!readData) return null;

        let data: PurchaseReturn = readData.getPurchaseReturnById;

        return (
            <div className='row'>
                <PurchaseReturnHeader
                    date={convertMilisecondsToDate(data.date)}
                    lang={lang}
                    no={data.no}
                    supplier={data.supplier!.name}
                />
                <PurchaseReturnDetail data={readData} lang={lang} />
                <div className='col-12'>
                    <PurchaseReturnSummary
                        cash_total={Currency(formatCommaValue(data.cash_total))}
                        credit_discount_total={Currency(
                            formatCommaValue(data.credit_discount_total)
                        )}
                        lang={lang}
                        grand_total={Currency(formatCommaValue(data.grand_total))}
                        qty_total={data.qty_total}
                    />
                </div>
                <div className='col-12'>
                    <h3>{purchaseReturnForm.description.label[lang]} : </h3>
                    {data.description}
                </div>
            </div>
        );
    }

    return (
        <Page>
            <MasterCard
                header={{ link: '/purchase_return', title }}
                initSection='purchase_return'
                isCrud
                lang={lang}
                module={moduleName}
            >
                {({ action, recordKey, handleRecord, handleResetAction, handleShowCreate }) =>
                    ['list'].includes(action!) ? (
                        <MasterList
                            action={action!}
                            auth={storage.getToken()}
                            columns={purchaseReturnColumns}
                            customContentDrawer={renderCustomContent()}
                            customFilter={{
                                components: renderCustomFilter(),
                                value: handleCustomFilter(),
                            }}
                            lang={lang}
                            module={moduleName}
                            mutation={{
                                delete: deletePurchaseReturn,
                            }}
                            query={{
                                list: getPurchaseReturnList,
                                read: getPurchaseReturnById,
                                refetch: PURCHASE_RETURN_LIST,
                            }}
                            softDelete
                            title={title}
                            handleData={handleData}
                            handleReadData={handleReadData}
                            handleRecord={handleRecord!}
                            handleResetAction={handleResetAction!}
                            handleShowCreate={handleShowCreate!}
                        />
                    ) : (
                        <PurchaseReturnForm
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
