import { Form } from 'antd';
import moment from 'moment';
import * as React from 'react';

import { Lang, PurchaseReturnListData, PurchasingWithDetailListData } from 'src/core/api';

import { CrudListTable } from 'src/shared/components/Crud/CrudList/CrudListTable';
import { DatePicker } from 'src/shared/components/DatePicker';
import { Input, InputArea } from 'src/shared/components/Input';
import { Modal } from 'src/shared/components/Modal';
import { handlePurchaseReturnDetail } from 'src/shared/components/Purchasing/helpers';
import { SaveButton } from 'src/shared/components/SaveButton';
import { Select } from 'src/shared/components/Select';
import { Spin } from 'src/shared/components/Spin';
import { SearchPurchasingList } from 'src/shared/containers/SearchPurchasingList';
import { useUIContext } from 'src/shared/contexts/UIContext';
import { mutationForm, queryForm, queryList } from 'src/shared/graphql';
import { getMedicineByQuery } from 'src/shared/graphql/Medicine/schema.gql';
import { getSuppliers } from 'src/shared/graphql/Supplier/schema.gql';
import { Currency } from 'src/shared/helpers/formatCurrency';
import {
    convertMilisecondsToDate,
    formatDefaultDate,
    formatMoment,
} from 'src/shared/helpers/formatDate';
import { formatNumeric } from 'src/shared/helpers/formatNumeric';
import { formatCommaValue, formatValue } from 'src/shared/helpers/formatValue';
import { classNames } from 'src/shared/utilities/classNames';
import { Message } from 'src/shared/utilities/message';
import { Progress } from 'src/shared/utilities/progress';

import { PurchaseReturnSummary } from './components/PurchaseReturnSummary';
import {
    purchaseReturnDetailColumns,
    purchaseReturnError,
    purchaseReturnForm,
    purchaseReturnModal,
} from './constants';
import {
    createPurchaseReturn,
    getPurchaseReturnById,
    PURCHASE_RETURN_BY_ID,
    updatePurchaseReturn,
} from './schema.gql';

require('./PurchaseReturnForm.sass');

export interface PurchaseReturnFormProps extends Lang {
    auth: string | null;
    formType: string;
    recordKey?: string;
}

export function PurchaseReturnForm({
    auth,
    formType,
    recordKey,
    ...props
}: PurchaseReturnFormProps) {
    let { lang } = { ...props };
    let [form] = Form.useForm();
    let [dataForm] = Form.useForm();
    let isMobile = useUIContext().isMobile;
    let searchPurchasing = React.useRef<any>();
    let [supplier, setSupplier] = React.useState('');
    let [init, setInit] = React.useState(false);
    let [data, setData] = React.useState<PurchaseReturnListData[]>([]);
    let [modal, showModal] = React.useState<{
        recordKey?: string;
        show: boolean;
        tempData?: PurchasingWithDetailListData;
        title: string;
    }>({
        show: false,
        title: purchaseReturnModal.add.title[lang],
    });
    let [grandTotal, setGrandTotal] = React.useState({
        cash_total: 0,
        credit_discount_total: 0,
        grand_total: 0,
        qty_total: 0,
    });
    let [filter, setFilter] = React.useState<{ id?: string }>({});
    let [formQty, setFormQty] = React.useState(0);

    let supplierQuery = queryForm({ query: getSuppliers });
    let mutation = mutationForm({
        formType,
        mutations: formType === 'create' ? createPurchaseReturn : updatePurchaseReturn,
        resetForm: handleResetForm,
    });
    let query = queryForm({
        skip: formType === 'create',
        query: getPurchaseReturnById,
        variables: { id: recordKey },
    });
    let medicineQuery = queryList({
        skip: !filter.id,
        query: getMedicineByQuery,
        variables: { payload: { id: filter.id } },
    });

    if (mutation.loading || query.loading || supplierQuery.loading || medicineQuery.loading)
        return <Spin />;

    let suppliers = supplierQuery.data?.getSuppliers;
    let initialValues = {
        no: query.data?.getPurchaseReturnById.no,
        date: query.data
            ? formatMoment(convertMilisecondsToDate(query.data.getPurchaseReturnById.date))
            : moment(),
        supplier:
            query.data?.getPurchaseReturnById.supplier.id ||
            (!!suppliers.length && suppliers[0].id),
        description: query.data?.getPurchaseReturnById.description,
    };

    let detail = handlePurchaseReturnDetail(query.data);
    if (!init) {
        if (formType === 'update' && recordKey && detail.length > 0) {
            setData([...detail]);
            setGrandTotal({
                cash_total: query.data.getPurchaseReturnById.cash_total,
                credit_discount_total: query.data.getPurchaseReturnById.credit_discount_total,
                grand_total: query.data.getPurchaseReturnById.grand_total,
                qty_total: query.data.getPurchaseReturnById.qty_total,
            });
            setSupplier(initialValues.supplier);
            setInit(true);
        } else {
            setSupplier(initialValues.supplier);
            setInit(true);
        }
    }

    let medicine = medicineQuery.data?.getMedicineByQuery;
    if (medicine) {
        if (filter.id) {
            let checkStock = medicine.stock - formQty >= 0;
            if (checkStock) {
                if (modal.recordKey) {
                    handleChangeItemList();
                } else {
                    handleAddItemList();
                }
            } else {
                Message(purchaseReturnError.stock[lang], 'error');
            }
        }
        setFilter({});
    }

    function handleAddItemList() {
        let tempData = modal.tempData!;
        if (formQty > tempData.qty) {
            Message(purchaseReturnError.qty[lang], 'error');
        } else {
            let sub_total = formQty * formatValue(tempData.buy_price);
            let cash_total = 0;
            let discount_amount = sub_total;
            if (tempData.credit_total === '0') {
                discount_amount = 0;
                cash_total = sub_total;
            }
            let newData = {
                key: tempData.key!,
                no: tempData.no,
                code: tempData.code,
                medicine: tempData.medicine,
                qty_buy: tempData.qty,
                qty: formQty,
                uom: tempData.uom,
                buy_price: tempData.buy_price,
                discount_amount: Currency(formatCommaValue(discount_amount)),
                sub_total: Currency(formatCommaValue(sub_total)),
            };
            setGrandTotal({
                cash_total: grandTotal.cash_total + cash_total,
                credit_discount_total: grandTotal.credit_discount_total + discount_amount,
                grand_total: grandTotal.grand_total + sub_total,
                qty_total: grandTotal.qty_total + formatValue(formQty),
            });
            setData([...data, newData]);
            handleClose();
        }
    }

    function handleChangeItemList() {
        let selected = data.find((data) => data.key === modal.recordKey);
        if (formQty > selected!.qty_buy) {
            Message(purchaseReturnError.qty[lang], 'error');
        } else {
            let sub_total = 0;
            let cash_total = 0;
            let credit_discount_total = 0;
            let grand_total = 0;
            let qty_total = 0;
            let newData = data.map((data) => {
                if (data.key !== modal.recordKey) {
                    sub_total = formatValue(data.qty) * formatValue(data.buy_price);
                    let discount_amount = sub_total;
                    let cash_amount = 0;
                    if (data.discount_amount === '0') {
                        discount_amount = 0;
                        cash_amount = sub_total;
                    }
                    cash_total += cash_amount;
                    credit_discount_total += discount_amount;
                    grand_total += sub_total;
                    qty_total += formatValue(data.qty);

                    return data;
                }
                sub_total = formQty * formatValue(data.buy_price);
                let discount_amount = sub_total;
                let cash_amount = 0;
                if (data.discount_amount === '0') {
                    discount_amount = 0;
                    cash_amount = sub_total;
                }
                cash_total += cash_amount;
                credit_discount_total += discount_amount;
                grand_total += sub_total;
                qty_total += formatValue(formQty);

                return {
                    ...data,
                    qty: formQty,
                    discount_amount: Currency(formatCommaValue(discount_amount)),
                    sub_total: Currency(formatCommaValue(sub_total)),
                };
            });
            setGrandTotal({
                cash_total,
                credit_discount_total,
                grand_total,
                qty_total,
            });
            setData([...newData]);
            handleClose();
        }
    }

    function handleClose() {
        showModal({ ...modal, show: false });
    }

    function handleDelete(record: any) {
        let newData = data.filter((data) => data.key !== record.key);
        let cash_total = 0;
        let credit_discount_total = 0;
        let grand_total = 0;
        let qty_total = 0;
        // eslint-disable-next-line array-callback-return
        newData.map((data) => {
            let sub_total = formatValue(data.sub_total);
            let discount_amount = sub_total;
            let cash_amount = 0;
            if (data.discount_amount === '0') {
                discount_amount = 0;
                cash_amount = sub_total;
            }
            cash_total += formatValue(cash_amount);
            credit_discount_total += formatValue(discount_amount);
            grand_total += formatValue(sub_total);
            qty_total += formatValue(data.qty);
        });
        setGrandTotal({ cash_total, credit_discount_total, grand_total, qty_total });
        setData([...newData]);
    }

    function handleFinish(values: any) {
        if (data.length > 0) {
            Progress(true);

            let { date, description = '', supplier } = values;
            let detailData = data.map((data) => {
                let key = data.key!.split('-');

                return {
                    buy_price: formatValue(data.buy_price),
                    discount_amount: formatValue(data.discount_amount),
                    medicine: key[1],
                    purchasing: key[0],
                    qty: formatValue(data.qty),
                    qty_buy: formatValue(data.qty_buy),
                };
            });
            let fetchQuery;
            let fetchPayload = {
                cash_total: grandTotal.cash_total,
                credit_discount_total: grandTotal.credit_discount_total,
                date: formatDefaultDate(date),
                description,
                detail: detailData,
                grand_total: grandTotal.grand_total,
                id: recordKey,
                qty_total: grandTotal.qty_total,
                supplier,
            };
            let payload;

            switch (formType) {
                case 'create':
                    payload = { ...fetchPayload, id: undefined, created_by: auth };
                    break;
                case 'update':
                    payload = { ...fetchPayload, updated_by: auth };
                    fetchQuery = [{ query: PURCHASE_RETURN_BY_ID, variables: { id: recordKey } }];
                    break;
            }

            mutation.action({
                refetchQueries: fetchQuery,
                variables: {
                    payload,
                },
            });
        } else {
            Message(purchaseReturnError.required[lang], 'error');
        }
    }

    function handleFinishData(values: any) {
        let { qty } = values;
        let tempData = modal.tempData!;

        let medicineId;
        if (modal.recordKey) {
            medicineId = modal.recordKey.split('-')[1];
        } else {
            medicineId = tempData.key!.split('-')[1];
        }

        setFilter({ id: medicineId });
        setFormQty(qty);
    }

    function handlePurchasingList(recordKey: string, record: any) {
        let checkData = data.find((data) => data.key === recordKey);
        if (checkData) {
            Message(purchaseReturnError.duplicate[lang], 'error');
        } else {
            dataForm.setFieldsValue({
                qty: 1,
            });
            searchPurchasing.current.closeList();
            showModal({
                tempData: { ...record, id: recordKey } as PurchasingWithDetailListData,
                show: true,
                title: purchaseReturnModal.add.title[lang],
            });
        }
    }

    function handleRecord(recordKey: string, record: any) {
        dataForm.setFieldsValue({
            qty: record.qty,
        });
        showModal({
            recordKey,
            show: true,
            title: purchaseReturnModal.update.title[lang],
        });
    }

    function handleResetForm() {
        setData([]);
        setGrandTotal({
            cash_total: 0,
            credit_discount_total: 0,
            grand_total: 0,
            qty_total: 0,
        });
        form.resetFields(['date', 'supplier', 'description']);
    }

    function handleSupplier(value: string) {
        setSupplier(value);
    }

    function renderDataForm() {
        return (
            <Modal
                className='ModalData'
                footer={null}
                onCancel={handleClose}
                title={modal.title}
                visible={modal.show}
            >
                <Form form={dataForm} layout='vertical' onFinish={handleFinishData}>
                    <Form.Item
                        getValueFromEvent={formatNumeric}
                        label={purchaseReturnForm.qty.label[lang]}
                        name='qty'
                        rules={[{ required: true, message: purchaseReturnForm.qty.message[lang] }]}
                    >
                        <Input autoFocus />
                    </Form.Item>
                </Form>
            </Modal>
        );
    }

    return (
        <Form form={form} initialValues={initialValues} layout='vertical' onFinish={handleFinish}>
            <div className='row'>
                <div className='col-12 col@md-3'>
                    <h1 className='fw-bold'>Header</h1>
                    <Form.Item label={purchaseReturnForm.no.label[lang]} name='no'>
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        label={purchaseReturnForm.date.label[lang]}
                        name='date'
                        rules={[
                            {
                                required: true,
                                message: purchaseReturnForm.date.message[lang],
                            },
                        ]}
                    >
                        <DatePicker defaultValue={moment()} />
                    </Form.Item>
                    <Form.Item
                        label={purchaseReturnForm.supplier.label[lang]}
                        name='supplier'
                        rules={[
                            { required: true, message: purchaseReturnForm.supplier.message[lang] },
                        ]}
                    >
                        <Select onChange={handleSupplier} showSearch>
                            {suppliers &&
                                suppliers.map((supplier: any) => (
                                    <Select.Option key={supplier.id} value={supplier.id}>
                                        {supplier.name}
                                    </Select.Option>
                                ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label={purchaseReturnForm.description.label[lang]}
                        name='description'
                    >
                        <InputArea />
                    </Form.Item>
                </div>
                <div className={classNames('col-12 col@md-9', !isMobile ? 'Detail-Bordered' : '')}>
                    <h1 className='fw-bold'>Detail</h1>
                    <Form.Item label={purchaseReturnForm.purchasing.label[lang]} name='purchasing'>
                        <SearchPurchasingList
                            {...props}
                            onRecordList={handlePurchasingList}
                            ref={searchPurchasing}
                            supplier_id={supplier}
                            withDetail
                        />
                    </Form.Item>
                    {renderDataForm()}
                    <CrudListTable
                        {...props}
                        columns={purchaseReturnDetailColumns}
                        dataSource={data}
                        handleDelete={handleDelete}
                        handleRecord={handleRecord}
                        hasAction
                        showDelete
                        showUpdate
                    />
                    <PurchaseReturnSummary
                        cash_total={Currency(formatCommaValue(grandTotal.cash_total))}
                        credit_discount_total={Currency(
                            formatCommaValue(grandTotal.credit_discount_total)
                        )}
                        lang={lang}
                        grand_total={Currency(formatCommaValue(grandTotal.grand_total))}
                        qty_total={grandTotal.qty_total}
                    />
                    <Form.Item>
                        <SaveButton lang={lang} />
                    </Form.Item>
                </div>
            </div>
        </Form>
    );
}
