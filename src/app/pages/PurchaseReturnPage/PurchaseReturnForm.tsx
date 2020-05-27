import { Form } from 'antd';
import moment from 'moment';
import * as React from 'react';

import {
    PurchaseReturnDetail,
    PurchaseReturnListData,
    PurchasingWithDetailListData,
} from 'src/core/api';

import { CrudListTable } from 'src/shared/components/Crud/CrudList/CrudListTable';
import { DatePicker } from 'src/shared/components/DatePicker';
import { Input, InputArea } from 'src/shared/components/Input';
import { Modal } from 'src/shared/components/Modal';
import { SaveButton } from 'src/shared/components/SaveButton';
import { Select } from 'src/shared/components/Select';
import { Spin } from 'src/shared/components/Spin';
import { SearchPurchasingList } from 'src/shared/containers/SearchPurchasingList';
import { useUIContext } from 'src/shared/contexts/UIContext';
import { mutationForm, queryForm } from 'src/shared/graphql';
import { getSuppliers } from 'src/shared/graphql/Supplier/schema.gql';
import { Currency } from 'src/shared/helpers/formatCurrency';
import {
    convertMilisecondsToDate,
    formatDefaultDate,
    formatMoment,
} from 'src/shared/helpers/formatDate';
import { formatCommaValue, formatValue } from 'src/shared/helpers/formatValue';
import { classNames } from 'src/shared/utilities/classNames';
import { Message } from 'src/shared/utilities/message';
import { Progress } from 'src/shared/utilities/progress';

import { PurchaseReturnSummary } from './components/PurchaseReturnSummary';
import { purchaseReturnDetailColumns } from './constants';
import {
    createPurchaseReturn,
    getPurchaseReturnById,
    PURCHASE_RETURN_BY_ID,
    updatePurchaseReturn,
} from './schema.gql';
import { formatNumeric } from 'src/shared/helpers/formatNumeric';

require('./PurchaseReturnForm.sass');

interface PurchaseReturnFormProps {
    auth: string | null;
    formType: string;
    recordKey?: string;
}

export function PurchaseReturnForm({ auth, formType, recordKey }: PurchaseReturnFormProps) {
    let [form] = Form.useForm();
    let [dataForm] = Form.useForm();
    let isMobile = useUIContext().isMobile;
    let searchPurchasing = React.useRef<any>();
    let [supplier, setSupplier] = React.useState('');
    let [isNoChanged, changeNo] = React.useState(false);
    let [init, setInit] = React.useState(false);
    let [data, setData] = React.useState<PurchaseReturnListData[]>([]);
    let [modal, showModal] = React.useState<{
        recordKey?: string;
        show: boolean;
        tempData?: PurchasingWithDetailListData;
        title: string;
    }>({
        show: false,
        title: 'Add Product',
    });
    let [grandTotal, setGrandTotal] = React.useState({
        cash_total: 0,
        credit_discount_total: 0,
        grand_total: 0,
        qty_total: 0,
    });

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

    if (mutation.loading || query.loading || supplierQuery.loading) return <Spin />;

    let suppliers = supplierQuery.data?.getSuppliers;
    let initialValues = {
        no: query.data?.getPurchaseReturnById.no,
        date: query.data
            ? formatMoment(convertMilisecondsToDate(query.data.getPurchaseReturnById.date))
            : moment(),
        supplier: query.data?.getPurchaseReturnById.supplier.id || (suppliers && suppliers[0].id),
        description: query.data?.getPurchaseReturnById.description,
    };

    let detail = handleDetail(query.data);
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

    function handleChangeNo() {
        changeNo(initialValues.no !== form.getFieldValue('no'));
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
            grand_total += formatValue(data.discount_amount);
            qty_total += formatValue(data.qty);
        });
        setGrandTotal({ cash_total, credit_discount_total, grand_total, qty_total });
        setData([...newData]);
    }

    function handleDetail(data?: any): PurchaseReturnListData[] {
        let purchaseReturn = data?.getPurchaseReturnById.detail;
        if (!purchaseReturn || !purchaseReturn.length) {
            return [];
        }

        return purchaseReturn.map((detail: PurchaseReturnDetail) => {
            return {
                key: detail.purchasing!.id + '-' + detail.medicine!.id,
                no: detail.purchasing!.no,
                code: detail.medicine!.code,
                medicine: detail.medicine!.name,
                qty_buy: detail.qty_buy,
                qty: detail.qty,
                uom: detail.medicine!.uom!.name,
                buy_price: Currency(formatCommaValue(detail.buy_price)),
                discount_amount: Currency(formatCommaValue(detail.discount_amount)),
            };
        });
    }

    function handleFinish(values: any) {
        if (data.length > 0) {
            Progress(true);

            let { no, date, description = '', supplier } = values;
            let detailData = data.map((data) => {
                let key = data.key!.split('-');

                return {
                    buy_price: formatValue(data.buy_price),
                    discount_amount: formatValue(data.discount_amount),
                    medicine: key[1],
                    purchasing: key[0],
                    qty: data.qty,
                    qty_buy: data.qty_buy,
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
                no,
                qty_total: grandTotal.qty_total,
                supplier,
            };
            let payload;

            switch (formType) {
                case 'create':
                    payload = { ...fetchPayload, id: undefined, created_by: auth };
                    break;
                case 'update':
                    payload = { ...fetchPayload, isNoChanged, updated_by: auth };
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
            Message('Fill detail first!', 'error');
        }
    }

    function handleFinishData(values: any) {
        let { qty } = values;
        let tempData = modal.tempData!;

        if (modal.recordKey) {
            let selected = data.find((data) => data.key === modal.recordKey);
            if (qty > selected!.qty_buy) {
                Message('Qty of items is more than qty purchase', 'error');
            } else {
                let cash_total = 0;
                let credit_discount_total = 0;
                let grand_total = 0;
                let qty_total = 0;
                let newData = data.map((data) => {
                    if (data.key !== modal.recordKey) {
                        let discount_amount = formatValue(data.qty) * formatValue(data.buy_price);
                        grand_total += formatValue(discount_amount);
                        qty_total += formatValue(data.qty);

                        return data;
                    }
                    let discount_amount = qty * formatValue(data.buy_price);
                    grand_total += formatValue(discount_amount);
                    qty_total += formatValue(qty);

                    return {
                        ...data,
                        qty,
                        discount_amount: Currency(formatCommaValue(discount_amount)),
                    };
                });
                setGrandTotal({ cash_total, credit_discount_total, grand_total, qty_total });
                setData([...newData]);
                handleClose();
            }
        } else {
            if (qty > tempData.qty) {
                Message('Qty of items is more than qty purchase', 'error');
            } else {
                let discount_amount = qty * formatValue(tempData.buy_price);
                let newData = {
                    key: tempData.key!,
                    no: tempData.no,
                    code: tempData.code,
                    medicine: tempData.medicine,
                    qty_buy: tempData.qty,
                    qty,
                    uom: tempData.uom,
                    buy_price: tempData.buy_price,
                    discount_amount: Currency(formatCommaValue(discount_amount)),
                };
                setGrandTotal({
                    cash_total: grandTotal.cash_total,
                    credit_discount_total: grandTotal.credit_discount_total,
                    grand_total: grandTotal.grand_total + discount_amount,
                    qty_total: grandTotal.qty_total + formatValue(qty),
                });
                setData([...data, newData]);
                handleClose();
            }
        }
    }

    function handlePurchasingList(recordKey: string, record: any) {
        let checkData = data.find((data) => data.key === recordKey);
        if (checkData) {
            Message('Data already exist!', 'error');
        } else {
            dataForm.setFieldsValue({
                qty: 1,
            });
            searchPurchasing.current.closeList();
            showModal({
                tempData: { ...record, id: recordKey } as PurchasingWithDetailListData,
                show: true,
                title: 'Add Product',
            });
        }
    }

    function handleOk() {
        dataForm.submit();
    }

    function handleRecord(recordKey: string, record: any) {
        dataForm.setFieldsValue({
            qty: record.qty,
        });
        showModal({
            recordKey,
            show: true,
            title: 'Update Product',
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
        form.resetFields(['no', 'date', 'supplier', 'description']);
    }

    function handleSupplier(value: string) {
        setSupplier(value);
    }

    function renderDataForm() {
        return (
            <Modal
                className='ModalData'
                onCancel={handleClose}
                onOk={handleOk}
                title={modal.title}
                visible={modal.show}
            >
                <Form form={dataForm} layout='vertical' onFinish={handleFinishData}>
                    <Form.Item
                        getValueFromEvent={formatNumeric}
                        label='Qty'
                        name='qty'
                        rules={[{ required: true, message: 'Please input the Qty' }]}
                    >
                        <Input />
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
                    <Form.Item
                        label='Purchase No'
                        name='no'
                        rules={[{ required: true, message: 'Please input the purchase no' }]}
                    >
                        <Input onChange={handleChangeNo} />
                    </Form.Item>
                    <Form.Item
                        label='Purchase Payment Date'
                        name='date'
                        rules={[
                            {
                                required: true,
                                message: 'Please select the purchase payment date',
                            },
                        ]}
                    >
                        <DatePicker defaultValue={moment()} />
                    </Form.Item>
                    <Form.Item
                        label='Supplier'
                        name='supplier'
                        rules={[{ required: true, message: 'Please select the supplier' }]}
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
                    <Form.Item label='Description' name='description'>
                        <InputArea />
                    </Form.Item>
                </div>
                <div className={classNames('col-12 col@md-9', !isMobile ? 'Detail-Bordered' : '')}>
                    <h1 className='fw-bold'>Detail</h1>
                    <Form.Item label='Purchasing' name='purchasing'>
                        <SearchPurchasingList
                            onRecordList={handlePurchasingList}
                            ref={searchPurchasing}
                            supplier_id={supplier}
                            withDetail
                        />
                    </Form.Item>
                    {renderDataForm()}
                    <CrudListTable
                        columns={purchaseReturnDetailColumns}
                        dataSource={data}
                        handleDelete={handleDelete}
                        handleRecord={handleRecord}
                        hasAction
                    />
                    <PurchaseReturnSummary
                        cash_total={Currency(formatCommaValue(grandTotal.cash_total))}
                        credit_discount_total={Currency(
                            formatCommaValue(grandTotal.credit_discount_total)
                        )}
                        grand_total={Currency(formatCommaValue(grandTotal.grand_total))}
                        qty_total={grandTotal.qty_total}
                    />
                    <Form.Item>
                        <SaveButton />
                    </Form.Item>
                </div>
            </div>
        </Form>
    );
}
