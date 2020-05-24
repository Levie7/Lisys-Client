import { Form } from 'antd';
import * as React from 'react';

import { Alert } from 'src/shared/components/Alert';
import { Info } from 'src/shared/components/Info';
import { Input, InputArea } from 'src/shared/components/Input';
import { SaveButton } from 'src/shared/components/SaveButton';
import { Spin } from 'src/shared/components/Spin';
import { mutationForm, queryForm } from 'src/shared/graphql';
import {
    createSupplier,
    getSupplierById,
    SUPPLIER_BY_ID,
    updateSupplier,
} from 'src/shared/graphql/Supplier/schema.gql';
import { formatNumeric } from 'src/shared/helpers/formatNumeric';
import { Progress } from 'src/shared/utilities/progress';

import { alertMessage, supplierInfo } from './constants';

interface MasterSupplierFormProps {
    auth: string | null;
    formType: string;
    recordKey?: string;
}

export function MasterSupplierForm({ auth, formType, recordKey }: MasterSupplierFormProps) {
    let [form] = Form.useForm();

    let mutation = mutationForm({
        formType,
        mutations: formType === 'create' ? createSupplier : updateSupplier,
        resetForm: handleResetForm,
    });
    let query = queryForm({
        skip: formType === 'create',
        query: getSupplierById,
        variables: { id: recordKey },
    });

    if (mutation.loading || query.loading) return <Spin />;

    let initialValues = {
        account_name: query.data?.getSupplierById.account_name,
        account_no: query.data?.getSupplierById.account_no,
        address: query.data?.getSupplierById.address,
        bank: query.data?.getSupplierById.bank,
        city: query.data?.getSupplierById.city,
        contact: query.data?.getSupplierById.contact,
        email: query.data?.getSupplierById.email,
        name: query.data?.getSupplierById.name,
        npwp: query.data?.getSupplierById.npwp,
        phone: query.data?.getSupplierById.phone,
        province: query.data?.getSupplierById.province,
        zip_code: query.data?.getSupplierById.zip_code,
    };

    function handleFinish(values: any) {
        Progress(true);

        let {
            account_name = '',
            account_no = '',
            address = '',
            bank = '',
            city = '',
            contact = '',
            email = '',
            name,
            npwp = '',
            phone,
            province = '',
            zip_code = '',
        } = values;
        let fetchQuery;
        let fetchPayload = {
            id: recordKey,
            account_name,
            account_no,
            address,
            bank,
            city,
            contact,
            email,
            name,
            npwp,
            phone,
            province,
            zip_code,
        };
        let payload;

        switch (formType) {
            case 'create':
                payload = { ...fetchPayload, id: undefined, created_by: auth };
                break;
            case 'update':
                fetchQuery = [{ query: SUPPLIER_BY_ID, variables: { id: recordKey } }];
                payload = { ...fetchPayload, updated_by: auth };
                break;
        }

        mutation.action({
            refetchQueries: fetchQuery,
            variables: {
                payload,
            },
        });
    }

    function handleResetForm() {
        form.resetFields([
            'account_name',
            'account_no',
            'address',
            'bank',
            'city',
            'contact',
            'email',
            'name',
            'npwp',
            'phone',
            'province',
            'zip_code',
        ]);
    }

    return (
        <>
            <Alert message={alertMessage} type='info' showIcon />
            <Form
                form={form}
                initialValues={initialValues}
                layout='vertical'
                onFinish={handleFinish}
                scrollToFirstError
            >
                <Info
                    description={supplierInfo.general.description}
                    title={supplierInfo.general.title}
                >
                    <Form.Item
                        label='Name'
                        name='name'
                        rules={[{ required: true, message: 'Please input the name' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label='Phone'
                        name='phone'
                        rules={[{ required: true, message: 'Please input the phone number' }]}
                    >
                        <Input />
                    </Form.Item>
                </Info>
                <Info
                    description={supplierInfo.additional.description}
                    title={supplierInfo.additional.title}
                >
                    <Form.Item label='Contact' name='contact'>
                        <Input />
                    </Form.Item>
                    <Form.Item label='E-mail' name='email' rules={[{ type: 'email' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label='Address' name='address'>
                        <InputArea />
                    </Form.Item>
                    <Form.Item label='City' name='city'>
                        <Input />
                    </Form.Item>
                    <Form.Item label='Province' name='province'>
                        <Input />
                    </Form.Item>
                    <Form.Item getValueFromEvent={formatNumeric} label='Zipcode' name='zip_code'>
                        <Input />
                    </Form.Item>
                </Info>
                <Info description={supplierInfo.bank.description} title={supplierInfo.bank.title}>
                    <Form.Item label='Bank Name' name='bank'>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        getValueFromEvent={formatNumeric}
                        label='Account No'
                        name='account_no'
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label='Account Name' name='account_name'>
                        <Input />
                    </Form.Item>
                    <Form.Item getValueFromEvent={formatNumeric} label='Npwp' name='npwp'>
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <SaveButton />
                    </Form.Item>
                </Info>
            </Form>
        </>
    );
}
