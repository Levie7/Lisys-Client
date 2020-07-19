import moment from 'moment';
import React from 'react';

import { Page } from 'src/app/shell/Page';

import { Purchasing } from 'src/core/api';
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
    getPurchasingById,
    getPurchasingList,
    PURCHASING_LIST,
} from 'src/shared/graphql/Purchasing/schema.gql';
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
import { PurchaseDetail } from './components/PurchaseDetail';
import { PurchaseHeader } from './components/PurchaseHeader';
import { PurchaseSummary } from './components/PurchaseSummary';
import { moduleName, purchaseListColumns, title } from './constants';
import { PurchaseListForm } from './PurchaseListForm';

export const PurchaseListPage = () => {
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

    function handleReadData(data?: any) {
        setReadData(data);

        return data?.getPurchasingById;
    }

    function renderCustomContent() {
        if (!readData) return null;

        let data: Purchasing = readData.getPurchasingById;

        return (
            <div className='row'>
                <PurchaseHeader
                    date={convertMilisecondsToDate(data.date)}
                    due_date={convertMilisecondsToDate(data.due_date)}
                    no={data.no}
                    supplier={data.supplier!.name}
                />
                <PurchaseDetail lang={lang} data={readData} />
                <div className='col-12'>
                    <PurchaseSummary
                        credit_total={Currency(formatCommaValue(data.credit_total))}
                        qty_total={data.qty_total}
                        total={Currency(formatCommaValue(data.grand_total))}
                    />
                </div>
                <div className='col-12'>
                    <h3>Description : </h3>
                    {data.description}
                </div>
            </div>
        );
    }

    return (
        <Page>
            <MasterCard
                header={{ link: '/purchase_list', title }}
                initSection='purchase'
                isCrud
                module={moduleName}
            >
                {({ action, recordKey, handleRecord, handleResetAction, handleShowCreate }) =>
                    ['list'].includes(action!) ? (
                        <MasterList
                            action={action!}
                            auth={storage.getToken()}
                            columns={purchaseListColumns}
                            customContentDrawer={renderCustomContent()}
                            customFilter={{
                                components: renderCustomFilter(),
                                value: handleCustomFilter(),
                            }}
                            lang={lang}
                            module={moduleName}
                            mutation={{ delete: deletePurchasing }}
                            query={{
                                list: getPurchasingList,
                                read: getPurchasingById,
                                refetch: PURCHASING_LIST,
                            }}
                            softDelete
                            title={title}
                            handleData={handlePurchasingData}
                            handleReadData={handleReadData}
                            handleRecord={handleRecord!}
                            handleResetAction={handleResetAction!}
                            handleShowCreate={handleShowCreate!}
                        />
                    ) : (
                        <PurchaseListForm
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
