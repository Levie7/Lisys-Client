import { Form } from 'antd';
import moment from 'moment';
import * as React from 'react';

import { Medicine, SalesListData } from 'src/core/api';

import { CrudListTable } from 'src/shared/components/Crud/CrudList/CrudListTable';
import { DatePicker } from 'src/shared/components/DatePicker';
import { Icon } from 'src/shared/components/Icon';
import { Input, InputArea } from 'src/shared/components/Input';
import { Modal } from 'src/shared/components/Modal';
import { SaveButton } from 'src/shared/components/SaveButton';
import { Spin } from 'src/shared/components/Spin';
import { SearchMedicineList } from 'src/shared/containers/SearchMedicineList';
import { useUIContext } from 'src/shared/contexts/UIContext';
import { mutationForm, queryList } from 'src/shared/graphql';
import { getMedicineByQuery } from 'src/shared/graphql/Medicine/schema.gql';
import { Currency, formatCurrency } from 'src/shared/helpers/formatCurrency';
import { formatDefaultDate } from 'src/shared/helpers/formatDate';
import { formatNumeric } from 'src/shared/helpers/formatNumeric';
import { formatCommaValue, formatValue } from 'src/shared/helpers/formatValue';
import { classNames } from 'src/shared/utilities/classNames';
import { Message } from 'src/shared/utilities/message';
import { Progress } from 'src/shared/utilities/progress';

import { SalesSummary } from './components/SalesSummary';
import { salesDetailColumns } from './constants';
import { createSales } from './schema.gql';
import { Button } from 'src/shared/components/Button';

require('./SalesListForm.sass');

interface SalesListFormProps {
    auth: string | null;
    formType: string;
}

export function SalesListForm({ auth, formType }: SalesListFormProps) {
    let [form] = Form.useForm();
    let [dataForm] = Form.useForm();
    let [paymentForm] = Form.useForm();
    let isMobile = useUIContext().isMobile;
    let searchMedicine = React.useRef<any>();
    let [filter, setFilter] = React.useState({ barcode: '', code: '' });
    let [data, setData] = React.useState<SalesListData[]>([]);
    let [modal, showModal] = React.useState<{
        recordKey?: string;
        show: boolean;
        tempData?: Medicine;
        title: string;
    }>({
        show: false,
        title: 'Add Product',
    });
    let [modalPayment, showModalPayment] = React.useState(false);
    let [grandTotal, setGrandTotal] = React.useState({
        qty_total: 0,
        total: 0,
    });
    let [payment, setPayment] = React.useState({
        amount_total: 0,
        change_total: 0,
    });

    let medicineQuery = queryList({
        skip: filter.code === '' && filter.barcode === '',
        query: getMedicineByQuery,
        variables: { payload: { barcode: filter.barcode, code: filter.code } },
    });
    let mutation = mutationForm({
        formType,
        mutations: createSales,
        resetForm: handleResetForm,
    });

    if (mutation.loading || medicineQuery.loading) return <Spin />;

    let initialValues = {
        date: moment(),
    };

    let medicine = medicineQuery.data?.getMedicineByQuery;
    if (medicine) {
        let checkData = data.find((data) => data.key === medicine.id);
        if (filter.barcode !== '') {
            if (checkData) {
                handleChangeProduct({ qty: ++checkData.qty, recordKey: checkData.key! });
            } else {
                handleAddProduct({ medicine, qty: 1 });
            }
        } else if (filter.code !== '') {
            if (checkData) {
                Message('Data already exist!', 'error');
            } else {
                dataForm.setFieldsValue({ qty: 1 });
                showModal({
                    tempData: medicine as Medicine,
                    show: true,
                    title: 'Add Product',
                });
            }
        }
        handleResetFindData();
    } else if (medicine === null) {
        Message('Medicine not found!', 'error');
        handleResetFindData();
    }

    function handleAddProduct({ medicine, qty }: { medicine: Medicine; qty: number }) {
        let sub_total = qty * formatValue(medicine.sell_price);
        let newData = {
            key: medicine.id!,
            code: medicine.code,
            medicine: medicine.name,
            qty,
            uom: medicine.uom!.name,
            sell_price: Currency(formatCommaValue(medicine.sell_price)),
            sub_total: Currency(formatCommaValue(sub_total)),
        };
        setGrandTotal({
            qty_total: grandTotal.qty_total + formatValue(qty),
            total: grandTotal.total + sub_total,
        });
        setPayment({
            amount_total: payment.amount_total,
            change_total: payment.amount_total - sub_total,
        });
        setData([...data, newData]);
    }

    function handleBarcode(e: any) {
        e.preventDefault();
        setFilter({ ...filter, barcode: e.target.value });
    }

    function handleChangeProduct({ qty, recordKey }: { qty: number; recordKey: string }) {
        let qty_total = 0;
        let total = 0;
        let newData = data.map((data) => {
            if (data.key !== recordKey) {
                let sub_total = formatValue(data.qty) * formatValue(data.sell_price);
                qty_total += formatValue(data.qty);
                total += sub_total;

                return data;
            }
            let sub_total = qty * formatValue(data.sell_price);
            qty_total += formatValue(qty);
            total += sub_total;

            return {
                ...data,
                qty,
                sub_total: Currency(formatCommaValue(sub_total)),
            };
        });
        setGrandTotal({ qty_total, total });
        setPayment({
            amount_total: payment.amount_total,
            change_total: payment.amount_total - total,
        });
        setData([...newData]);
    }

    function handleClose() {
        showModal({ ...modal, show: false });
    }

    function handleClosePayment() {
        showModalPayment(false);
    }

    function handleCode(e: any) {
        e.preventDefault();
        setFilter({ ...filter, code: e.target.value });
    }

    function handleDelete(record: any) {
        let newData = data.filter((data) => data.key !== record.key);
        let qty_total = 0;
        let total = 0;
        // eslint-disable-next-line array-callback-return
        newData.map((data) => {
            let sub_total = formatValue(data.qty) * formatValue(data.sell_price);
            qty_total += formatValue(data.qty);
            total += sub_total;
        });
        setGrandTotal({ qty_total, total });
        setPayment({
            amount_total: payment.amount_total,
            change_total: payment.amount_total - total,
        });
        setData([...newData]);
    }

    function handleFinish(values: any) {
        if (data.length > 0) {
            Progress(true);

            let { no, date, description = '' } = values;
            let detailData = data.map((data) => {
                return {
                    medicine: data.key,
                    qty: formatValue(data.qty),
                    sell_price: formatValue(data.sell_price),
                    sub_total: formatValue(data.sub_total),
                };
            });
            let fetchQuery;
            let fetchPayload = {
                change_total: payment.change_total,
                id: undefined,
                date: formatDefaultDate(date),
                description,
                detail: detailData,
                grand_total: grandTotal.total,
                no,
                payment_total: payment.amount_total,
                qty_total: grandTotal.qty_total,
            };
            let payload = { ...fetchPayload, created_by: auth };

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
        let { qty = 0 } = values;
        let tempData = modal.tempData!;
        if (modal.recordKey) {
            handleChangeProduct({ qty, recordKey: modal.recordKey });
        } else {
            handleAddProduct({ medicine: tempData, qty });
        }

        dataForm.resetFields(['qty', 'batch_no', 'expired_date']);
        handleClose();
    }

    function handleFinishPayment(values: any) {
        let { payment } = values;

        setPayment({
            amount_total: formatValue(payment),
            change_total: formatValue(payment) - grandTotal.total,
        });
        paymentForm.resetFields(['payment']);
        handleClosePayment();
    }

    function handleMedicineList(recordKey: string, record: any) {
        let checkData = data.find((data) => data.key === recordKey);
        if (checkData) {
            Message('Data already exist!', 'error');
        } else {
            dataForm.setFieldsValue({ qty: 1 });
            searchMedicine.current.closeList();
            showModal({
                tempData: {
                    ...record,
                    id: recordKey,
                    uom: { name: record.uom_name },
                    sell_price: formatValue(record.sell_price),
                } as Medicine,
                show: true,
                title: 'Add Product',
            });
        }
    }

    function handleNew() {
        handleResetForm();
    }

    function handleShowPay() {
        showModalPayment(true);
    }

    function handleRecord(recordKey: string, record: any) {
        dataForm.setFieldsValue({ qty: record.qty });
        showModal({
            recordKey,
            show: true,
            title: 'Update Product',
        });
    }

    function handleResetFindData() {
        setFilter({ barcode: '', code: '' });
        form.resetFields(['barcode', 'code']);
    }

    function handleResetForm() {
        setData([]);
        setGrandTotal({
            qty_total: 0,
            total: 0,
        });
        setPayment({
            amount_total: 0,
            change_total: 0,
        });
        form.resetFields(['no', 'date', 'description']);
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
                        label='Qty'
                        name='qty'
                        rules={[{ required: true, message: 'Please input the Qty' }]}
                    >
                        <Input autoFocus />
                    </Form.Item>
                </Form>
            </Modal>
        );
    }

    function renderPayment() {
        return (
            <Modal
                className='ModalPayment'
                footer={null}
                onCancel={handleClosePayment}
                title='Payment'
                visible={modalPayment}
            >
                <Form form={paymentForm} layout='vertical' onFinish={handleFinishPayment}>
                    <Form.Item
                        getValueFromEvent={formatCurrency}
                        label='Payment Amount'
                        name='payment'
                    >
                        <Input autoFocus id='payment' />
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
                        label='Sales No'
                        name='no'
                        rules={[{ required: true, message: 'Please input the sales no' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label='Sales Date'
                        name='date'
                        rules={[
                            {
                                required: true,
                                message: 'Please select the sales date',
                            },
                        ]}
                    >
                        <DatePicker defaultValue={moment()} />
                    </Form.Item>
                    <Form.Item label='Description' name='description'>
                        <InputArea />
                    </Form.Item>
                </div>
                <div className={classNames('col-12 col@md-9', !isMobile ? 'Detail-Bordered' : '')}>
                    <h1 className='fw-bold'>Detail</h1>
                    <Form.Item label='Medicine' name='medicine_code'>
                        <div className='row'>
                            <div className='col-9 col@md-4'>
                                <Input
                                    id='code'
                                    onPressEnter={handleCode}
                                    placeholder='Code'
                                    prefix={Icon['code']}
                                />
                            </div>
                            <div className='col-3 col@md-4'>
                                <SearchMedicineList
                                    onRecordList={handleMedicineList}
                                    ref={searchMedicine}
                                />
                            </div>
                            <div className='col-12 col@md-4'>
                                <Input
                                    autoFocus
                                    id='barcode'
                                    onChange={handleBarcode}
                                    placeholder='Barcode'
                                    prefix={Icon['barcode']}
                                />
                            </div>
                        </div>
                    </Form.Item>
                    {renderDataForm()}
                    {renderPayment()}
                    <CrudListTable
                        columns={salesDetailColumns}
                        dataSource={data}
                        handleDelete={handleDelete}
                        handleRecord={handleRecord}
                        hasAction
                    />
                    <SalesSummary
                        amount_total={Currency(formatCommaValue(payment.amount_total))}
                        change_total={Currency(formatCommaValue(payment.change_total))}
                        isMobile={isMobile}
                        qty_total={grandTotal.qty_total}
                        total={Currency(formatCommaValue(grandTotal.total))}
                    />
                    <Form.Item>
                        <div className='d-flex fj-between'>
                            <SaveButton />
                            <Button
                                className='bg-green fg-white'
                                id='pay'
                                onClick={handleShowPay}
                                type='dashed'
                            >
                                {Icon['payment']} Pay
                            </Button>
                            <Button
                                className='bg-orange fg-white'
                                id='new'
                                onClick={handleNew}
                                type='dashed'
                            >
                                {Icon['plus']} New
                            </Button>
                            <a
                                // eslint-disable-next-line react/jsx-no-target-blank
                                target='_blank'
                                href={'/sales_list?create'}
                            >
                                <Button type='danger'>{Icon['pending']} Pending</Button>
                            </a>
                        </div>
                    </Form.Item>
                </div>
            </div>
        </Form>
    );
}
