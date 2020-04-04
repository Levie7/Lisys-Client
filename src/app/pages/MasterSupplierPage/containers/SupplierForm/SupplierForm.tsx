import { Form } from 'antd';
import * as React from 'react';

import { SaveSettingButton } from 'src/app/pages/SettingPage/components/SaveSettingButton';
import { getRoles } from 'src/app/pages/SettingPage/containers/UserManagement/Role/containers/schema.gql';
import {
    createSupplier,
    getSupplierById,
    SUPPLIER_BY_ID,
    SUPPLIERS,
    updateSupplier,
} from 'src/app/pages/MasterSupplierPage/containers/schema.gql';

import { Info } from 'src/shared/components/Info';
import { Input, InputArea } from 'src/shared/components/Input';
import { Spin } from 'src/shared/components/Spin';
import { mutationForm } from 'src/shared/graphql/mutationForm';
import { ErrorHandler } from 'src/shared/utilities/errors';
import { Progress } from 'src/shared/utilities/progress';

import { AccountNo } from '../../components/AccountNo';
import { Npwp } from '../../components/Npwp';
import { Zipcode } from '../../components/Zipcode';
import { supplierInfo } from './constants';

interface SupplierFormProps {
    formType: string;
    recordKey?: string;
}

export function SupplierForm({ formType, recordKey }: SupplierFormProps) {
    let [form] = Form.useForm();

    let mutation = mutationForm(formType, formType === 'create' ? createSupplier : updateSupplier);
    let query = handleQuery(
        { isSkip: formType === 'create' ? true : false, variables: { id: recordKey } },
        getSupplierById
    );
    let roleQuery = handleQuery(undefined, getRoles);
    if (mutation.loading || query.loading || roleQuery.loading) return <Spin />;

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
        let payload = {
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

        switch (formType) {
            case 'create':
                fetchQuery = [{ query: SUPPLIERS }];
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
                break;
            case 'update':
                fetchQuery = [
                    { query: SUPPLIERS },
                    { query: SUPPLIER_BY_ID, variables: { id: recordKey } },
                ];
                break;
            default:
                break;
        }

        mutation.action({
            refetchQueries: fetchQuery,
            variables: {
                payload,
            },
        });
    }

    function handleQuery(options: any, queries: any) {
        let { data, loading } = queries({
            onError(error: any) {
                ErrorHandler(error);
            },
            skip: options && options.isSkip,
            variables: options && options.variables,
        });

        return {
            data,
            loading,
        };
    }

    return (
        <Form
            form={form}
            initialValues={initialValues}
            layout='vertical'
            onFinish={handleFinish}
            scrollToFirstError
        >
            <Info description={supplierInfo.general.description} title={supplierInfo.general.title}>
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
                <Zipcode />
            </Info>
            <Info description={supplierInfo.bank.description} title={supplierInfo.bank.title}>
                <Form.Item label='Bank Name' name='bank'>
                    <Input />
                </Form.Item>
                <AccountNo />
                <Form.Item label='Account Name' name='account_name'>
                    <Input />
                </Form.Item>
                <Npwp />
            </Info>
            <Form.Item>
                <SaveSettingButton />
            </Form.Item>
        </Form>
    );
}
