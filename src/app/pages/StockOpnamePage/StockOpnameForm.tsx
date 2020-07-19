import { Form } from 'antd';
import moment from 'moment';
import * as React from 'react';

import { Lang, Medicine, StockOpnameListData } from 'src/core/api';

import { CrudListTable } from 'src/shared/components/Crud/CrudList/CrudListTable';
import { DatePicker } from 'src/shared/components/DatePicker';
import { Input, InputArea } from 'src/shared/components/Input';
import { Modal } from 'src/shared/components/Modal';
import { SaveButton } from 'src/shared/components/SaveButton';
import { Spin } from 'src/shared/components/Spin';
import { SearchMedicineList } from 'src/shared/containers/SearchMedicineList';
import { useUIContext } from 'src/shared/contexts/UIContext';
import { mutationForm, queryList } from 'src/shared/graphql';
import { getMedicineByQuery } from 'src/shared/graphql/Medicine/schema.gql';
import { formatDefaultDate } from 'src/shared/helpers/formatDate';
import { formatNumeric } from 'src/shared/helpers/formatNumeric';
import { formatValue } from 'src/shared/helpers/formatValue';
import { classNames } from 'src/shared/utilities/classNames';
import { Message } from 'src/shared/utilities/message';
import { Progress } from 'src/shared/utilities/progress';

import { stockOpnameDetailColumns } from './constants';
import { createStockOpname, STOCK_OPNAME_BY_ID } from './schema.gql';

require('./StockOpnameForm.sass');

export interface StockOpnameFormProps extends Lang {
    auth: string | null;
    formType: string;
    recordKey?: string;
}

export function StockOpnameForm({ auth, formType, recordKey, ...props }: StockOpnameFormProps) {
    let [form] = Form.useForm();
    let [dataForm] = Form.useForm();
    let isMobile = useUIContext().isMobile;
    let searchMedicine = React.useRef<any>();
    let [filter, setFilter] = React.useState({ code: '' });
    let [data, setData] = React.useState<StockOpnameListData[]>([]);
    let [modal, showModal] = React.useState<{
        recordKey?: string;
        show: boolean;
        tempData?: Medicine;
        title: string;
    }>({
        show: false,
        title: 'Add Product',
    });

    let medicineQuery = queryList({
        skip: filter.code === '',
        query: getMedicineByQuery,
        variables: { payload: { code: filter.code } },
    });
    let mutation = mutationForm({
        formType,
        mutations: createStockOpname,
        resetForm: handleResetForm,
    });

    if (mutation.loading || medicineQuery.loading) return <Spin />;

    let initialValues = { date: moment() };

    let medicine = medicineQuery.data?.getMedicineByQuery;
    if (medicine) {
        let checkData = data.find((data) => data.key === medicine.id);
        if (checkData) {
            Message('Data already exist!', 'error');
        } else {
            dataForm.setFieldsValue({
                physical_stock: 1,
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

    function handleClose() {
        showModal({ ...modal, show: false });
    }

    function handleCode(e: any) {
        e.preventDefault();
        setFilter({ ...filter, code: e.target.value });
    }

    function handleDelete(record: any) {
        let newData = data.filter((data) => data.key !== record.key);
        setData([...newData]);
    }

    function handleFinish(values: any) {
        if (data.length > 0) {
            Progress(true);

            let { date, description = '' } = values;
            let detailData = data.map((data) => {
                return {
                    difference: formatValue(data.difference),
                    medicine: data.key,
                    physical_stock: formatValue(data.physical_stock),
                    system_stock: formatValue(data.system_stock),
                };
            });
            let fetchQuery;
            let fetchPayload = {
                id: recordKey,
                date: formatDefaultDate(date),
                description,
                detail: detailData,
            };
            let payload;

            switch (formType) {
                case 'create':
                    payload = { ...fetchPayload, id: undefined, created_by: auth };
                    break;
                case 'update':
                    payload = { ...fetchPayload, updated_by: auth };
                    fetchQuery = [{ query: STOCK_OPNAME_BY_ID, variables: { id: recordKey } }];
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
        let { physical_stock = 0 } = values;
        let tempData = modal.tempData!;
        if (modal.recordKey) {
            let newData = data.map((data) => {
                if (data.key !== modal.recordKey) {
                    return data;
                }
                return {
                    ...data,
                    physical_stock,
                    difference: physical_stock - data.system_stock,
                };
            });
            setData([...newData]);
        } else {
            let newData = {
                key: tempData.id!,
                code: tempData.code,
                medicine: tempData.name,
                uom: tempData.uom!.name,
                system_stock: tempData.stock,
                physical_stock,
                difference: physical_stock - tempData.stock,
            };
            setData([...data, newData]);
        }

        dataForm.resetFields(['physical_stock']);
        handleClose();
    }

    function handleMedicineList(recordKey: string, record: any) {
        let checkData = data.find((data) => data.key === recordKey);
        if (checkData) {
            Message('Data already exist!', 'error');
        } else {
            dataForm.setFieldsValue({ physical_stock: 1 });
            searchMedicine.current.closeList();
            showModal({
                tempData: { ...record, id: recordKey, uom: { name: record.uom_name } } as Medicine,
                show: true,
                title: 'Add Product',
            });
        }
    }

    function handleRecord(recordKey: string, record: any) {
        dataForm.setFieldsValue({ physical_stock: record.physical_stock });
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
                        label='Physical Stock'
                        name='physical_stock'
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
                    <Form.Item label='Stock Opname No' name='no'>
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        label='Stock Opname Date'
                        name='date'
                        rules={[
                            {
                                required: true,
                                message: 'Please select the stock opname date',
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
                    <Form.Item label='Code' name='code'>
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
                        columns={stockOpnameDetailColumns}
                        dataSource={data}
                        handleDelete={handleDelete}
                        handleRecord={handleRecord}
                        hasAction
                        showDelete
                        showUpdate
                    />
                    <Form.Item>
                        <SaveButton />
                    </Form.Item>
                </div>
            </div>
        </Form>
    );
}
