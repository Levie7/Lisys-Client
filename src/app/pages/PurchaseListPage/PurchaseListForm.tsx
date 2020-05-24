import { Form } from 'antd';
import moment from 'moment';
import * as React from 'react';

import { Input, InputArea } from 'src/shared/components/Input';
import { SaveButton } from 'src/shared/components/SaveButton';
import { Spin } from 'src/shared/components/Spin';
import { mutationForm, queryForm, queryList } from 'src/shared/graphql';
import { CrudListTable } from 'src/shared/components/Crud/CrudList/CrudListTable';
import { Progress } from 'src/shared/utilities/progress';

import { getSuppliers } from '../MasterSupplierPage/schema.gql';
import { getMedicineByQuery } from 'src/shared/graphql/Medicine/schema.gql';
import { purchaseDetailColumns } from './constants';
import {
    createPurchasing,
    getPurchasingById,
    PURCHASING_BY_ID,
    updatePurchasing,
} from './schema.gql';
import { Select } from 'src/shared/components/Select';
import { DatePicker } from 'src/shared/components/DatePicker';
import { useUIContext } from 'src/shared/contexts/UIContext';
import { classNames } from 'src/shared/utilities/classNames';
import { Message } from 'src/shared/utilities/message';
import { Modal } from 'src/shared/components/Modal';
import { formatNumeric } from 'src/shared/helpers/formatNumeric';
import { Medicine, PurchasingDetail, PurchasingListData } from 'src/core/api';
import { Currency, formatCurrency } from 'src/shared/helpers/formatCurrency';
import { formatCommaValue, formatValue } from 'src/shared/helpers/formatValue';
import {
    convertMilisecondsToDate,
    formatDate,
    formatDefaultDate,
    formatMoment,
} from 'src/shared/helpers/formatDate';
import { SearchMedicineList } from 'src/shared/containers/SearchMedicineList';
import { PurchaseSummary } from './components/PurchaseSummary';

require('./PurchaseListForm.sass');

interface PurchaseListFormProps {
    auth: string | null;
    formType: string;
    recordKey?: string;
}

export function PurchaseListForm({ auth, formType, recordKey }: PurchaseListFormProps) {
    let [form] = Form.useForm();
    let [dataForm] = Form.useForm();
    let isMobile = useUIContext().isMobile;
    let searchMedicine = React.useRef<any>();
    let [isNoChanged, changeNo] = React.useState(false);
    let [init, setInit] = React.useState(false);
    let [filter, setFilter] = React.useState({ code: '' });
    let [data, setData] = React.useState<PurchasingListData[]>([]);
    let [modal, showModal] = React.useState<{
        recordKey?: string;
        show: boolean;
        tempData?: Medicine;
        title: string;
    }>({
        show: false,
        title: 'Add Product',
    });
    let [grandTotal, setGrandTotal] = React.useState({
        credit_total: 0,
        qty_total: 0,
        total: 0,
    });

    let supplierQuery = queryForm({ query: getSuppliers });
    let medicineQuery = queryList({
        skip: filter.code === '',
        query: getMedicineByQuery,
        variables: { payload: { code: filter.code } },
    });
    let mutation = mutationForm({
        formType,
        mutations: formType === 'create' ? createPurchasing : updatePurchasing,
        resetForm: handleResetForm,
    });
    let query = queryForm({
        skip: formType === 'create',
        query: getPurchasingById,
        variables: { id: recordKey },
    });

    if (mutation.loading || query.loading || supplierQuery.loading || medicineQuery.loading)
        return <Spin />;

    let suppliers = supplierQuery.data?.getSuppliers;
    let initialValues = {
        no: query.data?.getPurchasingById.no,
        date: query.data
            ? formatMoment(convertMilisecondsToDate(query.data.getPurchasingById.date))
            : moment(),
        due_date: query.data
            ? formatMoment(convertMilisecondsToDate(query.data.getPurchasingById.due_date))
            : moment().add(1, 'months'),
        supplier: query.data?.getPurchasingById.supplier.id || (suppliers && suppliers[0].id),
        description: query.data?.getPurchasingById.description,
    };
    let detail = handleDetail(query.data);
    if (!init && recordKey && detail.length > 0) {
        setData([...detail]);
        setGrandTotal({
            credit_total: query.data.getPurchasingById.credit_total,
            qty_total: query.data.getPurchasingById.qty_total,
            total: query.data.getPurchasingById.grand_total,
        });
        setInit(true);
    }

    let medicine = medicineQuery.data?.getMedicineByQuery;
    if (medicine) {
        let checkData = data.find((data) => data.key === medicine.id);
        if (checkData) {
            Message('Data already exist!', 'error');
        } else {
            dataForm.setFieldsValue({
                qty: 1,
                batch_no: '',
                buy_price: Currency(formatCommaValue(medicine.buy_price)),
                sell_price: Currency(formatCommaValue(medicine.sell_price)),
                expired_date: moment(),
            });
            showModal({
                tempData: medicine as Medicine,
                show: true,
                title: 'Add Product',
            });
        }
        handleResetFindData();
    } else if (medicine === null) {
        Message('Medicine not found!', 'error');
        handleResetFindData();
    }

    function handleChangeNo() {
        changeNo(initialValues.no !== form.getFieldValue('no'));
    }

    function handleClose() {
        showModal({ ...modal, show: false });
    }

    function handleCode(e: any) {
        e.preventDefault();
        setFilter({ ...filter, code: e.target.value });
    }

    function handleDelete(record: any) {
        let newData = data.filter((data) => data.key !== record.key);
        let credit_total = 0;
        let qty_total = 0;
        let total = 0;
        // eslint-disable-next-line array-callback-return
        newData.map((data) => {
            let sub_total = formatValue(data.qty) * formatValue(data.buy_price);
            credit_total += sub_total;
            qty_total += formatValue(data.qty);
            total += sub_total;
        });
        setGrandTotal({ credit_total, qty_total, total });
        setData([...newData]);
    }

    function handleDetail(data?: any): PurchasingListData[] {
        let purchasing = data?.getPurchasingById.detail;
        if (!purchasing || !purchasing.length) {
            return [];
        }

        return purchasing.map((detail: PurchasingDetail) => {
            return {
                key: detail.medicine!.id,
                code: detail.medicine!.code,
                medicine: detail.medicine!.name,
                batch_no: detail.batch_no,
                expired_date: convertMilisecondsToDate(detail.expired_date),
                qty: detail.qty,
                uom: detail.medicine!.uom!.name,
                buy_price: Currency(formatCommaValue(detail.buy_price)),
                sell_price: Currency(formatCommaValue(detail.sell_price)),
                sub_total: Currency(formatCommaValue(detail.sub_total)),
            };
        });
    }

    function handleFinish(values: any) {
        if (data.length > 0) {
            Progress(true);

            let { no, date, due_date, description = '', supplier } = values;
            let detailData = data.map((data) => {
                return {
                    batch_no: data.batch_no,
                    buy_price: formatValue(data.buy_price),
                    expired_date: formatDefaultDate(data.expired_date),
                    medicine: data.key,
                    qty: formatValue(data.qty),
                    sell_price: formatValue(data.sell_price),
                    sub_total: formatValue(data.sub_total),
                };
            });
            let fetchQuery;
            let fetchPayload = {
                credit_total: grandTotal.credit_total,
                id: recordKey,
                date,
                description,
                detail: detailData,
                due_date,
                grand_total: grandTotal.total,
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
                    fetchQuery = [{ query: PURCHASING_BY_ID, variables: { id: recordKey } }];
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
        let { qty = 0, buy_price, sell_price, batch_no = '', expired_date } = values;
        let tempData = modal.tempData!;
        let sub_total = qty * formatValue(buy_price);
        if (modal.recordKey) {
            let credit_total = 0;
            let qty_total = 0;
            let total = 0;
            let newData = data.map((data) => {
                if (data.key !== modal.recordKey) {
                    sub_total = formatValue(data.qty) * formatValue(data.buy_price);
                    credit_total += sub_total;
                    qty_total += formatValue(data.qty);
                    total += sub_total;
                    return data;
                }
                sub_total = qty * formatValue(buy_price);
                credit_total += sub_total;
                qty_total += formatValue(qty);
                total += sub_total;
                return {
                    ...data,
                    batch_no,
                    expired_date: formatDate(expired_date),
                    qty,
                    buy_price,
                    sell_price,
                    sub_total: Currency(formatCommaValue(sub_total)),
                };
            });
            setGrandTotal({ credit_total, qty_total, total });
            setData([...newData]);
        } else {
            let newData = {
                key: tempData.id!,
                code: tempData.code,
                medicine: tempData.name,
                batch_no,
                expired_date: formatDate(expired_date),
                qty,
                uom: tempData.uom!.name,
                buy_price,
                sell_price,
                sub_total: Currency(formatCommaValue(sub_total)),
            };
            setGrandTotal({
                credit_total: grandTotal.credit_total + sub_total,
                qty_total: grandTotal.qty_total + formatValue(qty),
                total: grandTotal.total + sub_total,
            });
            setData([...data, newData]);
        }

        dataForm.resetFields(['qty', 'batch_no', 'expired_date']);
    }

    function handleMedicineList(recordKey: string, record: any) {
        let checkData = data.find((data) => data.key === recordKey);
        if (checkData) {
            Message('Data already exist!', 'error');
        } else {
            dataForm.setFieldsValue({
                qty: 1,
                batch_no: '',
                buy_price: record.buy_price,
                sell_price: record.sell_price,
                expired_date: moment(),
            });
            searchMedicine.current.closeList();
            showModal({
                tempData: { ...record, id: recordKey, uom: { name: record.uom_name } } as Medicine,
                show: true,
                title: 'Add Product',
            });
        }
    }

    function handleOk() {
        dataForm.submit();
        handleClose();
    }

    function handleRecord(recordKey: string, record: any) {
        dataForm.setFieldsValue({
            batch_no: record.batch_no,
            buy_price: record.buy_price,
            sell_price: record.sell_price,
            expired_date: formatMoment(record.expired_date),
            qty: record.qty,
        });
        showModal({
            recordKey,
            show: true,
            title: 'Update Product',
        });
    }

    function handleResetFindData() {
        setFilter({ code: '' });
        form.resetFields(['code']);
    }

    function handleResetForm() {
        setData([]);
        setGrandTotal({
            credit_total: 0,
            qty_total: 0,
            total: 0,
        });
        form.resetFields(['no', 'date', 'due_date', 'supplier', 'description']);
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
                        rules={[{ required: true, message: 'Please input the purchase no' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        getValueFromEvent={formatCurrency}
                        label='Buy Price'
                        name='buy_price'
                    >
                        <Input prefix='Rp' />
                    </Form.Item>
                    <Form.Item
                        getValueFromEvent={formatCurrency}
                        label='Sell Price'
                        name='sell_price'
                    >
                        <Input prefix='Rp' />
                    </Form.Item>
                    <Form.Item label='Batch No' name='batch_no'>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label='Expired Date'
                        name='expired_date'
                        rules={[{ required: true, message: 'Please select the expired date' }]}
                    >
                        <DatePicker />
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
                    <div className='row'>
                        <div className='col-6'>
                            <Form.Item
                                label='Purchase Date'
                                name='date'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select the purchase date',
                                    },
                                ]}
                            >
                                <DatePicker defaultValue={moment()} />
                            </Form.Item>
                        </div>
                        <div className='col-6'>
                            <Form.Item
                                label='Due Date'
                                name='due_date'
                                rules={[{ required: true, message: 'Please select the due date' }]}
                            >
                                <DatePicker defaultValue={moment().add(1, 'months')} />
                            </Form.Item>
                        </div>
                    </div>
                    <Form.Item
                        label='Supplier'
                        name='supplier'
                        rules={[{ required: true, message: 'Please select the supplier' }]}
                    >
                        <Select showSearch>
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
                    <Form.Item label='Code' name='code'>
                        <div className='row'>
                            <div className='col@md-4'>
                                <Input className='code' onPressEnter={handleCode} />
                            </div>
                            <div className='col@md-4'>
                                <SearchMedicineList
                                    onRecordList={handleMedicineList}
                                    ref={searchMedicine}
                                />
                            </div>
                        </div>
                    </Form.Item>
                    {renderDataForm()}
                    <CrudListTable
                        columns={purchaseDetailColumns}
                        dataSource={data}
                        handleDelete={handleDelete}
                        handleRecord={handleRecord}
                    />
                    <PurchaseSummary
                        credit_total={Currency(formatCommaValue(grandTotal.credit_total))}
                        qty_total={grandTotal.qty_total}
                        total={Currency(formatCommaValue(grandTotal.total))}
                    />
                    <Form.Item>
                        <SaveButton />
                    </Form.Item>
                </div>
            </div>
        </Form>
    );
}
