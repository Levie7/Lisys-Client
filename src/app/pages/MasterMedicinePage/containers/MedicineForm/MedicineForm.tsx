import { Form } from 'antd';
import * as React from 'react';

import {
    createMedicine,
    getMedicineById,
    MEDICINE_BY_ID,
    MEDICINES,
    updateMedicine,
} from 'src/app/pages/MasterMedicinePage/containers/schema.gql';

import { Info } from 'src/shared/components/Info';
import { Input } from 'src/shared/components/Input';
import { SaveButton } from 'src/shared/components/SaveButton';
import { Select } from 'src/shared/components/Select';
import { Spin } from 'src/shared/components/Spin';
import { getCategories } from 'src/shared/graphql/Category/schema.gql';
import { mutationForm } from 'src/shared/graphql/mutationForm';
import { getUoMs } from 'src/shared/graphql/UoM/schema.gql';
import { getVariants } from 'src/shared/graphql/Variant/schema.gql';
import { Currency, formatCurrency } from 'src/shared/helpers/formatCurrency';
import { formatPercentage, Percentage } from 'src/shared/helpers/formatPercentage';
import { formatNumeric } from 'src/shared/helpers/formatNumeric';
import { formatCommaValue, formatValue } from 'src/shared/helpers/formatValue';
import { ErrorHandler } from 'src/shared/utilities/errors';
import { Message } from 'src/shared/utilities/message';
import { Progress } from 'src/shared/utilities/progress';

import { medicineInfo } from './constants';

interface MedicineFormProps {
    formType: string;
    recordKey?: string;
}

export function MedicineForm({ formType, recordKey }: MedicineFormProps) {
    let [form] = Form.useForm();
    let [isBarcodeChanged, changeBarcode] = React.useState(false);
    let [isCodeChanged, changeCode] = React.useState(false);

    let mutation = mutationForm(formType, formType === 'create' ? createMedicine : updateMedicine);
    let query = handleQuery(
        { isSkip: formType === 'create' ? true : false, variables: { id: recordKey } },
        getMedicineById
    );
    let categoryQuery = handleQuery(undefined, getCategories);
    let uomQuery = handleQuery(undefined, getUoMs);
    let variantQuery = handleQuery(undefined, getVariants);
    if (
        mutation.loading ||
        query.loading ||
        categoryQuery.loading ||
        uomQuery.loading ||
        variantQuery.loading
    )
        return <Spin />;

    let initialValues = {
        barcode: query.data?.getMedicineById.barcode,
        buy_price: query.data && Currency(formatCommaValue(query.data.getMedicineById.buy_price)),
        category: query.data?.getMedicineById.category.id,
        code: query.data?.getMedicineById.code,
        key: query.data?.getMedicineById.id!,
        min_stock: query.data?.getMedicineById.min_stock,
        name: query.data?.getMedicineById.name,
        percentage:
            query.data &&
            Percentage(
                formatCommaValue(
                    ((query.data.getMedicineById.sell_price -
                        query.data.getMedicineById.buy_price) /
                        query.data.getMedicineById.buy_price) *
                        100
                )
            ),
        sell_price: query.data && Currency(formatCommaValue(query.data.getMedicineById.sell_price)),
        stock: query.data?.getMedicineById.stock,
        uom: query.data?.getMedicineById.uom.id,
        variant: query.data?.getMedicineById.variant.id,
    };
    let categories = categoryQuery.data?.getCategories;
    let uoms = uomQuery.data?.getUoMs;
    let variants = variantQuery.data?.getVariants;

    function handleChangeBarcode() {
        changeBarcode(initialValues.barcode !== form.getFieldValue('barcode'));
    }

    function handleChangeCode() {
        changeCode(initialValues.code !== form.getFieldValue('code'));
    }

    function handleFinish(values: any) {
        Progress(true);

        let {
            barcode = '',
            buy_price,
            category,
            code,
            min_stock = 0,
            name,
            sell_price,
            stock = 0,
            uom,
            variant,
        } = values;
        let fetchQuery;
        let fetchPayload = {
            id: recordKey,
            barcode,
            buy_price: formatValue(buy_price),
            category,
            code,
            min_stock: parseInt(min_stock),
            name,
            sell_price: formatValue(sell_price),
            stock,
            uom,
            variant,
        };
        let payload;

        switch (formType) {
            case 'create':
                fetchQuery = [{ query: MEDICINES }];
                payload = fetchPayload;
                form.resetFields([
                    'barcode',
                    'buy_price',
                    'category',
                    'code',
                    'min_stock',
                    'name',
                    'percentage',
                    'sell_price',
                    'stock',
                    'uom',
                    'variant',
                ]);
                break;
            case 'update':
                fetchQuery = [
                    { query: MEDICINES },
                    { query: MEDICINE_BY_ID, variables: { id: recordKey } },
                ];
                payload = { ...fetchPayload, isBarcodeChanged, isCodeChanged };
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

    function handlePercentage(e: any) {
        if (!form.getFieldValue('buy_price')) {
            return Message('Please fill the buy price first', 'error');
        }

        let buyPrice = formatValue(form.getFieldValue('buy_price'));
        let percentage = formatValue(formatPercentage(e)) / 100;
        let sellPrice = formatCommaValue(buyPrice + buyPrice * percentage);
        form.setFieldsValue({ sell_price: Currency(sellPrice) });

        return formatPercentage(e);
    }

    function handleSellPrice(e: any) {
        if (!form.getFieldValue('buy_price')) {
            return Message('Please fill the buy price first', 'error');
        }

        let buyPrice = formatValue(form.getFieldValue('buy_price'));
        let sellPrice = formatValue(formatCurrency(e));
        let percentage = formatCommaValue(((sellPrice - buyPrice) / buyPrice) * 100);
        form.setFieldsValue({ percentage: Percentage(percentage) });

        return formatCurrency(e);
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
            <Info description={medicineInfo.general.description} title={medicineInfo.general.title}>
                <Form.Item
                    label='Code'
                    name='code'
                    rules={[{ required: true, message: 'Please input the code' }]}
                >
                    <Input onChange={handleChangeCode} />
                </Form.Item>
                <Form.Item
                    label='Name'
                    name='name'
                    rules={[{ required: true, message: 'Please input the name' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label='Variant'
                    name='variant'
                    rules={[{ required: true, message: 'Please select the variant' }]}
                >
                    <Select showSearch>
                        {variants &&
                            variants.map((variant: any) => (
                                <Select.Option key={variant.id} value={variant.id}>
                                    {variant.name}
                                </Select.Option>
                            ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label='Category'
                    name='category'
                    rules={[{ required: true, message: 'Please select the category' }]}
                >
                    <Select showSearch>
                        {categories &&
                            categories.map((category: any) => (
                                <Select.Option key={category.id} value={category.id}>
                                    {category.name}
                                </Select.Option>
                            ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label='UoM'
                    name='uom'
                    rules={[{ required: true, message: 'Please select the UoM' }]}
                >
                    <Select showSearch>
                        {uoms &&
                            uoms.map((uom: any) => (
                                <Select.Option key={uom.id} value={uom.id}>
                                    {uom.name}
                                </Select.Option>
                            ))}
                    </Select>
                </Form.Item>
            </Info>
            <Info description={medicineInfo.pricing.description} title={medicineInfo.pricing.title}>
                <Form.Item
                    getValueFromEvent={formatCurrency}
                    label='Buy Price'
                    name='buy_price'
                    rules={[{ required: true, message: 'Please input the buy price' }]}
                >
                    <Input prefix='Rp' />
                </Form.Item>
                <Form.Item getValueFromEvent={handlePercentage} name='percentage'>
                    <Input suffix='%' />
                </Form.Item>
                <Form.Item
                    getValueFromEvent={handleSellPrice}
                    label='Sell Price'
                    name='sell_price'
                    rules={[{ required: true, message: 'Please input the sell price' }]}
                >
                    <Input prefix='Rp' />
                </Form.Item>
            </Info>
            <Info
                description={medicineInfo.inventory.description}
                title={medicineInfo.inventory.title}
            >
                <Form.Item label='Barcode' name='barcode'>
                    <Input onChange={handleChangeBarcode} />
                </Form.Item>
                <Form.Item getValueFromEvent={formatNumeric} label='Min Stock' name='min_stock'>
                    <Input />
                </Form.Item>
                <Form.Item>
                    <SaveButton />
                </Form.Item>
            </Info>
        </Form>
    );
}
