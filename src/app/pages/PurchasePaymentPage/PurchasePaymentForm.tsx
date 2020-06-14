import { Form } from 'antd';
import moment from 'moment';
import * as React from 'react';

import { PurchasePaymentDetail, PurchasePaymentListData, Purchasing } from 'src/core/api';

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
import { Currency, formatCurrency } from 'src/shared/helpers/formatCurrency';
import {
    convertMilisecondsToDate,
    formatDefaultDate,
    formatMoment,
} from 'src/shared/helpers/formatDate';
import { formatCommaValue, formatValue } from 'src/shared/helpers/formatValue';
import { classNames } from 'src/shared/utilities/classNames';
import { Message } from 'src/shared/utilities/message';
import { Progress } from 'src/shared/utilities/progress';

import { PurchasePaymentSummary } from './components/PurchasePaymentSummary';
import { purchasePaymentDetailColumns } from './constants';
import {
    createPurchasePayment,
    getPurchasePaymentById,
    PURCHASE_PAYMENT_BY_ID,
    updatePurchasePayment,
} from './schema.gql';

require('./PurchasePaymentForm.sass');

interface PurchasePaymentFormProps {
    auth: string | null;
    formType: string;
    recordKey?: string;
}

export function PurchasePaymentForm({ auth, formType, recordKey }: PurchasePaymentFormProps) {
    let [form] = Form.useForm();
    let [dataForm] = Form.useForm();
    let isMobile = useUIContext().isMobile;
    let searchPurchasing = React.useRef<any>();
    let [supplier, setSupplier] = React.useState('');
    let [isNoChanged, changeNo] = React.useState(false);
    let [isPaymentNoDisabled, setPaymentNoDisabled] = React.useState(true);
    let [init, setInit] = React.useState(false);
    let [data, setData] = React.useState<PurchasePaymentListData[]>([]);
    let [modal, showModal] = React.useState<{
        recordKey?: string;
        show: boolean;
        tempData?: Purchasing;
        title: string;
    }>({
        show: false,
        title: 'Add Invoice',
    });
    let [grandTotal, setGrandTotal] = React.useState({
        credit_total: 0,
        payment_total: 0,
    });

    let supplierQuery = queryForm({ query: getSuppliers });
    let mutation = mutationForm({
        formType,
        mutations: formType === 'create' ? createPurchasePayment : updatePurchasePayment,
        resetForm: handleResetForm,
    });
    let query = queryForm({
        skip: formType === 'create',
        query: getPurchasePaymentById,
        variables: { id: recordKey },
    });

    if (mutation.loading || query.loading || supplierQuery.loading) return <Spin />;

    let suppliers = supplierQuery.data?.getSuppliers;
    let initialValues = {
        no: query.data?.getPurchasePaymentById.no,
        date: query.data
            ? formatMoment(convertMilisecondsToDate(query.data.getPurchasePaymentById.date))
            : moment(),
        supplier: query.data?.getPurchasePaymentById.supplier.id || (suppliers && suppliers[0].id),
        payment_method: query.data?.getPurchasePaymentById.payment_method || 'cash',
        payment_no: query.data?.getPurchasePaymentById.payment_no,
        description: query.data?.getPurchasePaymentById.description,
    };

    let detail = handleDetail(query.data);
    if (!init) {
        if (formType === 'update' && recordKey && detail.length > 0) {
            setData([...detail]);
            setGrandTotal({
                credit_total: query.data.getPurchasePaymentById.credit_total,
                payment_total: query.data.getPurchasePaymentById.payment_total,
            });
            setSupplier(initialValues.supplier);
            setInit(true);
            handlePaymentMethod(query.data.getPurchasePaymentById.payment_method);
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
        let credit_total = 0;
        let payment_total = 0;
        // eslint-disable-next-line array-callback-return
        newData.map((data) => {
            credit_total += formatValue(data.credit_total);
            payment_total += formatValue(data.payment_amount);
        });
        setGrandTotal({ credit_total, payment_total });
        setData([...newData]);
    }

    function handleDetail(data?: any): PurchasePaymentListData[] {
        let purchasePayment = data?.getPurchasePaymentById.detail;
        if (!purchasePayment || !purchasePayment.length) {
            return [];
        }

        return purchasePayment.map((detail: PurchasePaymentDetail) => {
            return {
                key: detail.purchasing!.id,
                no: detail.purchasing!.no,
                date: convertMilisecondsToDate(detail.purchasing!.date),
                due_date: convertMilisecondsToDate(detail.purchasing!.due_date),
                grand_total: Currency(formatCommaValue(detail.purchasing!.grand_total)),
                credit_total: Currency(formatCommaValue(detail.purchasing!.credit_total)),
                payment_amount: Currency(formatCommaValue(detail.payment_amount)),
            };
        });
    }

    function handleFinish(values: any) {
        if (data.length > 0) {
            Progress(true);

            let { no, date, description = '', payment_method, payment_no = '', supplier } = values;
            let detailData = data.map((data) => {
                return {
                    payment_amount: formatValue(data.payment_amount),
                    purchasing: data.key,
                };
            });
            let fetchQuery;
            let fetchPayload = {
                credit_total: grandTotal.credit_total,
                date: formatDefaultDate(date),
                description,
                detail: detailData,
                id: recordKey,
                no,
                payment_method,
                payment_no,
                payment_total: grandTotal.payment_total,
                supplier,
            };
            let payload;

            switch (formType) {
                case 'create':
                    payload = { ...fetchPayload, id: undefined, created_by: auth };
                    break;
                case 'update':
                    payload = { ...fetchPayload, isNoChanged, updated_by: auth };
                    fetchQuery = [{ query: PURCHASE_PAYMENT_BY_ID, variables: { id: recordKey } }];
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
        let { payment_amount } = values;
        let tempData = modal.tempData!;
        if (modal.recordKey) {
            let credit_total = 0;
            let payment_total = 0;
            let newData = data.map((data) => {
                if (data.key !== modal.recordKey) {
                    credit_total += formatValue(data.credit_total);
                    payment_total += formatValue(data.payment_amount);

                    return data;
                }
                credit_total += formatValue(data.credit_total);
                payment_total += formatValue(payment_amount);

                return {
                    ...data,
                    payment_amount,
                };
            });
            setGrandTotal({ credit_total, payment_total });
            setData([...newData]);
        } else {
            let newData = {
                key: tempData.id!,
                no: tempData.no,
                date: tempData.date,
                due_date: tempData.due_date,
                grand_total: tempData.grand_total,
                credit_total: tempData.credit_total,
                payment_amount: payment_amount,
            };
            setGrandTotal({
                credit_total: grandTotal.credit_total + formatValue(tempData.credit_total),
                payment_total: grandTotal.payment_total + formatValue(payment_amount),
            });
            setData([...data, newData]);
        }
    }

    function handlePurchasingList(recordKey: string, record: any) {
        let checkData = data.find((data) => data.key === recordKey);
        if (checkData) {
            Message('Data already exist!', 'error');
        } else {
            dataForm.setFieldsValue({
                payment_amount: record.credit_total,
            });
            searchPurchasing.current.closeList();
            showModal({
                tempData: { ...record, id: recordKey } as Purchasing,
                show: true,
                title: 'Add Invoice',
            });
        }
    }

    function handleOk() {
        dataForm.submit();
        handleClose();
    }

    function handlePaymentMethod(value: string) {
        setPaymentNoDisabled(false);
        if (value === 'cash') {
            setPaymentNoDisabled(true);
            form.setFieldsValue({ payment_no: '' });
        }
    }

    function handleRecord(recordKey: string, record: any) {
        dataForm.setFieldsValue({
            payment_amount: record.payment_amount,
        });
        showModal({
            recordKey,
            show: true,
            title: 'Update Invoice',
        });
    }

    function handleResetForm() {
        setData([]);
        setGrandTotal({
            credit_total: 0,
            payment_total: 0,
        });
        setPaymentNoDisabled(true);
        form.resetFields(['no', 'date', 'supplier', 'payment_method', 'payment_no', 'description']);
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
                        getValueFromEvent={formatCurrency}
                        label='Payment Amount'
                        name='payment_amount'
                    >
                        <Input prefix='Rp' />
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
                    <Form.Item
                        label='Payment Method'
                        name='payment_method'
                        rules={[{ required: true, message: 'Please select the payment method' }]}
                    >
                        <Select onChange={handlePaymentMethod}>
                            <Select.Option key='cash' value='cash'>
                                Cash
                            </Select.Option>
                            <Select.Option key='transfer' value='transfer'>
                                Transfer
                            </Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label='Payment No' name='payment_no'>
                        <Input disabled={isPaymentNoDisabled} />
                    </Form.Item>
                    <Form.Item label='Description' name='description'>
                        <InputArea />
                    </Form.Item>
                </div>
                <div className={classNames('col-12 col@md-9', !isMobile ? 'Detail-Bordered' : '')}>
                    <h1 className='fw-bold'>Detail</h1>
                    <Form.Item label='Purchasing' name='purchasing'>
                        <SearchPurchasingList
                            is_not_paid
                            onRecordList={handlePurchasingList}
                            ref={searchPurchasing}
                            supplier_id={supplier}
                        />
                    </Form.Item>
                    {renderDataForm()}
                    <CrudListTable
                        columns={purchasePaymentDetailColumns}
                        dataSource={data}
                        handleDelete={handleDelete}
                        handleRecord={handleRecord}
                        hasAction
                    />
                    <PurchasePaymentSummary
                        credit_total={Currency(formatCommaValue(grandTotal.credit_total))}
                        payment_total={Currency(formatCommaValue(grandTotal.payment_total))}
                    />
                    <Form.Item>
                        <SaveButton />
                    </Form.Item>
                </div>
            </div>
        </Form>
    );
}
