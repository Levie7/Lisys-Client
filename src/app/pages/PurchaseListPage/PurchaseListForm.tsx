import { Form } from 'antd';
import moment from 'moment';
import * as React from 'react';

import { Lang, Medicine, PurchasingListData } from 'src/core/api';

import { CrudListTable } from 'src/shared/components/Crud/CrudList/CrudListTable';
import { DatePicker } from 'src/shared/components/DatePicker';
import { Input, InputArea } from 'src/shared/components/Input';
import { handlePurchaseListDetail } from 'src/shared/components/Purchasing/helpers';
import { Modal } from 'src/shared/components/Modal';
import { SaveButton } from 'src/shared/components/SaveButton';
import { Select } from 'src/shared/components/Select';
import { Spin } from 'src/shared/components/Spin';
import { SearchMedicineList } from 'src/shared/containers/SearchMedicineList';
import { useUIContext } from 'src/shared/contexts/UIContext';
import { mutationForm, queryForm, queryList } from 'src/shared/graphql';
import { getMedicineByQuery } from 'src/shared/graphql/Medicine/schema.gql';
import {
    createPurchasing,
    getPurchasingById,
    PURCHASING_BY_ID,
    updatePurchasing,
} from 'src/shared/graphql/Purchasing/schema.gql';
import { getSuppliers } from 'src/shared/graphql/Supplier/schema.gql';
import { Currency, formatCurrency } from 'src/shared/helpers/formatCurrency';
import {
    convertMilisecondsToDate,
    formatDate,
    formatDefaultDate,
    formatMoment,
} from 'src/shared/helpers/formatDate';
import { formatNumeric } from 'src/shared/helpers/formatNumeric';
import { formatCommaValue, formatValue } from 'src/shared/helpers/formatValue';
import { classNames } from 'src/shared/utilities/classNames';
import { Message } from 'src/shared/utilities/message';
import { Progress } from 'src/shared/utilities/progress';

import { PurchaseSummary } from './components/PurchaseSummary';
import { purchaseDetailColumns, purchaseError, purchaseForm, purchaseModal } from './constants';

require('./PurchaseListForm.sass');

export interface PurchaseListFormProps extends Lang {
    auth: string | null;
    formType: string;
    recordKey?: string;
}

export function PurchaseListForm({ auth, formType, recordKey, ...props }: PurchaseListFormProps) {
    let { lang } = { ...props };
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
        title: purchaseModal.add.title[lang],
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
        supplier:
            query.data?.getPurchasingById.supplier.id || (!!suppliers.length && suppliers[0].id),
        description: query.data?.getPurchasingById.description,
    };
    let detail = handlePurchaseListDetail(query.data);
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
            Message(purchaseError.duplicate[lang], 'error');
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
                title: purchaseModal.add.title[lang],
            });
        }
        handleResetFindData();
    } else if (medicine === null) {
        Message(purchaseError.not_found[lang], 'error');
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
                date: formatDefaultDate(date),
                description,
                detail: detailData,
                due_date: formatDefaultDate(due_date),
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
            Message(purchaseError.required[lang], 'error');
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
            Message(purchaseError.duplicate[lang], 'error');
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
                title: purchaseModal.add.title[lang],
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
            title: purchaseModal.update.title[lang],
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
                        label={purchaseForm.qty.label[lang]}
                        name='qty'
                        rules={[{ required: true, message: purchaseForm.qty.message[lang] }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        getValueFromEvent={formatCurrency}
                        label={purchaseForm.buy_price.label[lang]}
                        name='buy_price'
                        rules={[{ required: true, message: purchaseForm.buy_price.message[lang] }]}
                    >
                        <Input prefix='Rp' />
                    </Form.Item>
                    <Form.Item
                        getValueFromEvent={formatCurrency}
                        label={purchaseForm.sell_price.label[lang]}
                        name='sell_price'
                        rules={[{ required: true, message: purchaseForm.sell_price.message[lang] }]}
                    >
                        <Input prefix='Rp' />
                    </Form.Item>
                    <Form.Item label={purchaseForm.batch_no.label[lang]} name='batch_no'>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label={purchaseForm.expired_date.label[lang]}
                        name='expired_date'
                        rules={[
                            { required: true, message: purchaseForm.expired_date.message[lang] },
                        ]}
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
                        label={purchaseForm.no.label[lang]}
                        name='no'
                        rules={[{ required: true, message: purchaseForm.no.message[lang] }]}
                    >
                        <Input onChange={handleChangeNo} />
                    </Form.Item>
                    <div className='row'>
                        <div className='col-6'>
                            <Form.Item
                                label={purchaseForm.date.label[lang]}
                                name='date'
                                rules={[
                                    {
                                        required: true,
                                        message: purchaseForm.date.message[lang],
                                    },
                                ]}
                            >
                                <DatePicker defaultValue={moment()} />
                            </Form.Item>
                        </div>
                        <div className='col-6'>
                            <Form.Item
                                label={purchaseForm.due_date.label[lang]}
                                name='due_date'
                                rules={[
                                    {
                                        required: true,
                                        message: purchaseForm.due_date.message[lang],
                                    },
                                ]}
                            >
                                <DatePicker defaultValue={moment().add(1, 'months')} />
                            </Form.Item>
                        </div>
                    </div>
                    <Form.Item
                        label={purchaseForm.supplier.label[lang]}
                        name='supplier'
                        rules={[{ required: true, message: purchaseForm.supplier.message[lang] }]}
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
                    <Form.Item label={purchaseForm.description.label[lang]} name='description'>
                        <InputArea />
                    </Form.Item>
                </div>
                <div className={classNames('col-12 col@md-9', !isMobile ? 'Detail-Bordered' : '')}>
                    <h1 className='fw-bold'>Detail</h1>
                    <Form.Item label={purchaseForm.code.label[lang]} name='code'>
                        <div className='row'>
                            <div className='col@md-4'>
                                <Input className='code' onPressEnter={handleCode} />
                            </div>
                            <div className='col@md-4'>
                                <SearchMedicineList
                                    {...props}
                                    onRecordList={handleMedicineList}
                                    ref={searchMedicine}
                                />
                            </div>
                        </div>
                    </Form.Item>
                    {renderDataForm()}
                    <CrudListTable
                        {...props}
                        columns={purchaseDetailColumns}
                        dataSource={data}
                        handleDelete={handleDelete}
                        handleRecord={handleRecord}
                        hasAction
                        showDelete
                        showUpdate
                    />
                    <PurchaseSummary
                        credit_total={Currency(formatCommaValue(grandTotal.credit_total))}
                        lang={lang}
                        qty_total={grandTotal.qty_total}
                        total={Currency(formatCommaValue(grandTotal.total))}
                    />
                    <Form.Item>
                        <SaveButton lang={lang} />
                    </Form.Item>
                </div>
            </div>
        </Form>
    );
}
