import { Form } from 'antd';
import moment from 'moment';
import * as React from 'react';

import { Lang, SalesReturnListData, SalesWithDetailListData } from 'src/core/api';

import { CrudListTable } from 'src/shared/components/Crud/CrudList/CrudListTable';
import { DatePicker } from 'src/shared/components/DatePicker';
import { Input, InputArea } from 'src/shared/components/Input';
import { Modal } from 'src/shared/components/Modal';
import { handleSalesReturnDetail } from 'src/shared/components/Sales/helpers';
import { SaveButton } from 'src/shared/components/SaveButton';
import { Spin } from 'src/shared/components/Spin';
import { useUIContext } from 'src/shared/contexts/UIContext';
import { mutationForm, queryForm, queryList } from 'src/shared/graphql';
import { getMedicineByQuery } from 'src/shared/graphql/Medicine/schema.gql';
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

import { SalesReturnSummary } from './components/SalesReturnSummary';
import {
    salesReturnDetailColumns,
    salesReturnError,
    salesReturnForm,
    salesReturnModal,
} from './constants';
import {
    createSalesReturn,
    getSalesReturnById,
    SALES_RETURN_BY_ID,
    updateSalesReturn,
} from './schema.gql';

require('./SalesReturnForm.sass');

export interface SalesReturnFormProps extends Lang {
    auth: string | null;
    formType: string;
    recordKey?: string;
}

export function SalesReturnForm({ auth, formType, recordKey, ...props }: SalesReturnFormProps) {
    let { lang } = { ...props };
    let [form] = Form.useForm();
    let [dataForm] = Form.useForm();
    let isMobile = useUIContext().isMobile;
    let searchPurchasing = React.useRef<any>();
    let [init, setInit] = React.useState(false);
    let [data, setData] = React.useState<SalesReturnListData[]>([]);
    let [modal, showModal] = React.useState<{
        recordKey?: string;
        show: boolean;
        tempData?: SalesWithDetailListData;
        title: string;
    }>({
        show: false,
        title: salesReturnModal.add.title[lang],
    });
    let [grandTotal, setGrandTotal] = React.useState({
        grand_total: 0,
        qty_total: 0,
    });
    let [filter, setFilter] = React.useState<{ id?: string }>({});
    let [formQty, setFormQty] = React.useState(0);

    let mutation = mutationForm({
        formType,
        mutations: formType === 'create' ? createSalesReturn : updateSalesReturn,
        resetForm: handleResetForm,
    });
    let query = queryForm({
        skip: formType === 'create',
        query: getSalesReturnById,
        variables: { id: recordKey },
    });
    let medicineQuery = queryList({
        skip: !filter.id,
        query: getMedicineByQuery,
        variables: { payload: { id: filter.id } },
    });

    if (mutation.loading || query.loading || medicineQuery.loading) return <Spin />;

    let initialValues = {
        no: query.data?.getSalesReturnById.no,
        date: query.data
            ? formatMoment(convertMilisecondsToDate(query.data.getSalesReturnById.date))
            : moment(),
        description: query.data?.getSalesReturnById.description,
    };

    let detail = handleSalesReturnDetail(query.data);
    if (!init) {
        if (formType === 'update' && recordKey && detail.length > 0) {
            setData([...detail]);
            setGrandTotal({
                grand_total: query.data.getSalesReturnById.grand_total,
                qty_total: query.data.getSalesReturnById.qty_total,
            });
            setInit(true);
        } else {
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
                Message(salesReturnError.stock[lang], 'error');
            }
        }
        setFilter({});
    } else if (medicine === null) {
        Message(salesReturnError.not_found[lang], 'error');
        setFilter({});
    }

    function handleAddItemList() {
        let tempData = modal.tempData!;
        if (formQty > tempData.qty) {
            Message(salesReturnError.qty[lang], 'error');
        } else {
            let sub_total = formQty * formatValue(tempData.sell_price);
            let newData = {
                key: tempData.key!,
                no: tempData.no,
                code: tempData.code,
                medicine: tempData.medicine,
                qty_sell: tempData.qty,
                qty: formQty,
                uom: tempData.uom,
                sell_price: tempData.sell_price,
                sub_total: Currency(formatCommaValue(sub_total)),
            };
            setGrandTotal({
                grand_total: grandTotal.grand_total + sub_total,
                qty_total: grandTotal.qty_total + formatValue(formQty),
            });
            setData([...data, newData]);
            handleClose();
        }
    }

    function handleChangeItemList() {
        let selected = data.find((data) => data.key === modal.recordKey);
        if (formQty > selected!.qty_sell) {
            Message(salesReturnError.qty[lang], 'error');
        } else {
            let sub_total = 0;
            let grand_total = 0;
            let qty_total = 0;
            let newData = data.map((data) => {
                if (data.key !== modal.recordKey) {
                    sub_total = formatValue(data.qty) * formatValue(data.sell_price);
                    grand_total += sub_total;
                    qty_total += formatValue(data.qty);

                    return data;
                }
                sub_total = formQty * formatValue(data.sell_price);
                grand_total += sub_total;
                qty_total += formatValue(formQty);

                return {
                    ...data,
                    qty: formQty,
                    sub_total: Currency(formatCommaValue(sub_total)),
                };
            });
            setGrandTotal({ grand_total, qty_total });
            setData([...newData]);
            handleClose();
        }
    }

    function handleClose() {
        showModal({ ...modal, show: false });
    }

    function handleDelete(record: any) {
        let newData = data.filter((data) => data.key !== record.key);
        let grand_total = 0;
        let qty_total = 0;
        // eslint-disable-next-line array-callback-return
        newData.map((data) => {
            let sub_total = formatValue(data.sub_total);
            grand_total += formatValue(sub_total);
            qty_total += formatValue(data.qty);
        });
        setGrandTotal({ grand_total, qty_total });
        setData([...newData]);
    }

    function handleFinish(values: any) {
        if (data.length > 0) {
            Progress(true);

            let { date, description = '' } = values;
            let detailData = data.map((data) => {
                let key = data.key!.split('-');

                return {
                    medicine: key[1],
                    qty: formatValue(data.qty),
                    qty_sell: formatValue(data.qty_sell),
                    sales: key[0],
                    sell_price: formatValue(data.sell_price),
                    sub_total: formatValue(data.sub_total),
                };
            });
            let fetchQuery;
            let fetchPayload = {
                date: formatDefaultDate(date),
                description,
                detail: detailData,
                grand_total: grandTotal.grand_total,
                id: recordKey,
                qty_total: grandTotal.qty_total,
            };
            let payload;

            switch (formType) {
                case 'create':
                    payload = { ...fetchPayload, id: undefined, created_by: auth };
                    break;
                case 'update':
                    payload = { ...fetchPayload, updated_by: auth };
                    fetchQuery = [{ query: SALES_RETURN_BY_ID, variables: { id: recordKey } }];
                    break;
            }

            mutation.action({
                refetchQueries: fetchQuery,
                variables: {
                    payload,
                },
            });
        } else {
            Message(salesReturnError.required[lang], 'error');
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
            Message(salesReturnError.duplicate[lang], 'error');
        } else {
            dataForm.setFieldsValue({
                qty: 1,
            });
            searchPurchasing.current.closeList();
            showModal({
                tempData: { ...record, id: recordKey } as SalesWithDetailListData,
                show: true,
                title: salesReturnModal.add.title[lang],
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
            title: salesReturnModal.update.title[lang],
        });
    }

    function handleResetForm() {
        setData([]);
        setGrandTotal({ grand_total: 0, qty_total: 0 });
        form.resetFields(['date', 'description']);
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
                        label={salesReturnForm.qty.label[lang]}
                        name='qty'
                        rules={[{ required: true, message: salesReturnForm.qty.message[lang] }]}
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
                    <Form.Item label={salesReturnForm.no.label[lang]} name='no'>
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        label={salesReturnForm.date.label[lang]}
                        name='date'
                        rules={[
                            {
                                required: true,
                                message: salesReturnForm.date.message[lang],
                            },
                        ]}
                    >
                        <DatePicker defaultValue={moment()} />
                    </Form.Item>
                    <Form.Item label={salesReturnForm.description.label[lang]} name='description'>
                        <InputArea />
                    </Form.Item>
                </div>
                <div className={classNames('col-12 col@md-9', !isMobile ? 'Detail-Bordered' : '')}>
                    <h1 className='fw-bold'>Detail</h1>
                    <Form.Item label={salesReturnForm.sales.label[lang]} name='sales'>
                        {/* <SearchPurchasingList
                            {...props}
                            onRecordList={handlePurchasingList}
                            ref={searchPurchasing}
                            supplier_id={supplier}
                            withDetail
                        /> */}
                    </Form.Item>
                    {renderDataForm()}
                    <CrudListTable
                        {...props}
                        columns={salesReturnDetailColumns}
                        dataSource={data}
                        handleDelete={handleDelete}
                        handleRecord={handleRecord}
                        hasAction
                        showDelete
                        showUpdate
                    />
                    <SalesReturnSummary
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
