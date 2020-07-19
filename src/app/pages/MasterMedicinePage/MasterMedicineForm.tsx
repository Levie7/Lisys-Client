import { Form } from 'antd';
import * as React from 'react';

import { Lang } from 'src/core/api';

import { Alert } from 'src/shared/components/Alert';
import { Info } from 'src/shared/components/Info';
import { Input } from 'src/shared/components/Input';
import { SaveButton } from 'src/shared/components/SaveButton';
import { Select } from 'src/shared/components/Select';
import { Spin } from 'src/shared/components/Spin';
import { mutationForm, queryForm } from 'src/shared/graphql';
import { getCategories } from 'src/shared/graphql/Category/schema.gql';
import {
    createMedicine,
    getMedicineByQuery,
    MEDICINE_BY_QUERY,
    updateMedicine,
} from 'src/shared/graphql/Medicine/schema.gql';
import { getUoMs } from 'src/shared/graphql/UoM/schema.gql';
import { getVariants } from 'src/shared/graphql/Variant/schema.gql';
import { Currency, formatCurrency } from 'src/shared/helpers/formatCurrency';
import { formatPercentage, Percentage } from 'src/shared/helpers/formatPercentage';
import { formatNumeric } from 'src/shared/helpers/formatNumeric';
import { formatCommaValue, formatValue } from 'src/shared/helpers/formatValue';
import { Message } from 'src/shared/utilities/message';
import { Progress } from 'src/shared/utilities/progress';

import { alertMessage, medicineError, medicineForm, medicineInfo } from './constants';

export interface MasterMedicineFormProps extends Lang {
    auth: string | null;
    formType: string;
    recordKey?: string;
}

export function MasterMedicineForm({ auth, formType, lang, recordKey }: MasterMedicineFormProps) {
    let [form] = Form.useForm();
    let [isBarcodeChanged, changeBarcode] = React.useState(false);
    let [isBuyPriceChanged, changeBuyPrice] = React.useState(false);
    let [isCodeChanged, changeCode] = React.useState(false);
    let [isSellPriceChanged, changeSellPrice] = React.useState(false);

    let mutation = mutationForm({
        formType,
        mutations: formType === 'create' ? createMedicine : updateMedicine,
        resetForm: handleResetForm,
    });
    let query = queryForm({
        skip: formType === 'create',
        query: getMedicineByQuery,
        variables: { payload: { id: recordKey } },
    });
    let categoryQuery = queryForm({ query: getCategories });
    let uomQuery = queryForm({ query: getUoMs });
    let variantQuery = queryForm({ query: getVariants });
    if (
        mutation.loading ||
        query.loading ||
        categoryQuery.loading ||
        uomQuery.loading ||
        variantQuery.loading
    )
        return <Spin />;

    let categories = categoryQuery.data?.getCategories;
    let uoms = uomQuery.data?.getUoMs;
    let variants = variantQuery.data?.getVariants;

    let initialValues = {
        barcode: query.data?.getMedicineByQuery.barcode,
        buy_price:
            query.data && Currency(formatCommaValue(query.data.getMedicineByQuery.buy_price)),
        category: query.data?.getMedicineByQuery.category.id || (categories && categories[0].id),
        code: query.data?.getMedicineByQuery.code,
        key: query.data?.getMedicineByQuery.id!,
        min_stock: query.data?.getMedicineByQuery.min_stock,
        name: query.data?.getMedicineByQuery.name,
        percentage:
            query.data &&
            Percentage(
                formatCommaValue(
                    ((query.data.getMedicineByQuery.sell_price -
                        query.data.getMedicineByQuery.buy_price) /
                        query.data.getMedicineByQuery.buy_price) *
                        100
                )
            ),
        sell_price:
            query.data && Currency(formatCommaValue(query.data.getMedicineByQuery.sell_price)),
        stock: query.data?.getMedicineByQuery.stock,
        uom: query.data?.getMedicineByQuery.uom.id || (uoms && uoms[0].id),
        variant: query.data?.getMedicineByQuery.variant.id || (variants && variants[0].id),
    };

    function handleChangeBarcode() {
        changeBarcode(initialValues.barcode !== form.getFieldValue('barcode'));
    }

    function handleChangeBuyPrice() {
        changeBuyPrice(initialValues.buy_price !== form.getFieldValue('buy_price'));
    }

    function handleChangeCode() {
        changeCode(initialValues.code !== form.getFieldValue('code'));
    }

    function handleChangeSellPrice() {
        changeSellPrice(initialValues.sell_price !== form.getFieldValue('sell_price'));
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
                payload = { ...fetchPayload, id: undefined, created_by: auth };
                break;
            case 'update':
                fetchQuery = [
                    { query: MEDICINE_BY_QUERY, variables: { payload: { id: recordKey } } },
                ];
                payload = {
                    ...fetchPayload,
                    isBarcodeChanged,
                    isBuyPriceChanged,
                    isCodeChanged,
                    isSellPriceChanged,
                    updated_by: auth,
                };
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
            return Message(medicineError.percentage[lang], 'error');
        }

        let buyPrice = formatValue(form.getFieldValue('buy_price'));
        let percentage = formatValue(formatPercentage(e)) / 100;
        let sellPrice = formatCommaValue(buyPrice + buyPrice * percentage);
        form.setFieldsValue({ sell_price: Currency(sellPrice) });

        return formatPercentage(e);
    }

    function handleResetForm() {
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
    }

    function handleSellPrice(e: any) {
        if (!form.getFieldValue('buy_price')) {
            return Message(medicineError.sell_price[lang], 'error');
        }

        let buyPrice = formatValue(form.getFieldValue('buy_price'));
        let sellPrice = formatValue(formatCurrency(e));
        let percentage = formatCommaValue(((sellPrice - buyPrice) / buyPrice) * 100);
        form.setFieldsValue({ percentage: Percentage(percentage) });

        return formatCurrency(e);
    }

    return (
        <>
            <Alert message={alertMessage[lang]} type='info' showIcon />
            <Form
                form={form}
                initialValues={initialValues}
                layout='vertical'
                onFinish={handleFinish}
                scrollToFirstError
            >
                <Info
                    description={medicineInfo.general.description[lang]}
                    title={medicineInfo.general.title[lang]}
                >
                    <Form.Item
                        label={medicineForm.code.label[lang]}
                        name='code'
                        rules={[{ required: true, message: medicineForm.code.message[lang] }]}
                    >
                        <Input autoFocus onChange={handleChangeCode} />
                    </Form.Item>
                    <Form.Item
                        label={medicineForm.name.label[lang]}
                        name='name'
                        rules={[{ required: true, message: medicineForm.name.message[lang] }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label={medicineForm.variant.label[lang]}
                        name='variant'
                        rules={[{ required: true, message: medicineForm.variant.message[lang] }]}
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
                        label={medicineForm.category.label[lang]}
                        name='category'
                        rules={[{ required: true, message: medicineForm.category.message[lang] }]}
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
                        label={medicineForm.uom.label[lang]}
                        name='uom'
                        rules={[{ required: true, message: medicineForm.uom.message[lang] }]}
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
                <Info
                    description={medicineInfo.pricing.description[lang]}
                    title={medicineInfo.pricing.title[lang]}
                >
                    <Form.Item
                        getValueFromEvent={formatCurrency}
                        label={medicineForm.buy_price.label[lang]}
                        name='buy_price'
                        rules={[{ required: true, message: medicineForm.buy_price.message[lang] }]}
                    >
                        <Input prefix='Rp' onChange={handleChangeBuyPrice} />
                    </Form.Item>
                    <Form.Item getValueFromEvent={handlePercentage} name='percentage'>
                        <Input suffix='%' />
                    </Form.Item>
                    <Form.Item
                        getValueFromEvent={handleSellPrice}
                        label={medicineForm.sell_price.label[lang]}
                        name='sell_price'
                        rules={[{ required: true, message: medicineForm.sell_price.message[lang] }]}
                    >
                        <Input prefix='Rp' onChange={handleChangeSellPrice} />
                    </Form.Item>
                </Info>
                <Info
                    description={medicineInfo.inventory.description[lang]}
                    title={medicineInfo.inventory.title[lang]}
                >
                    <Form.Item label={medicineForm.barcode.label[lang]} name='barcode'>
                        <Input onChange={handleChangeBarcode} />
                    </Form.Item>
                    <Form.Item
                        getValueFromEvent={formatNumeric}
                        label={medicineForm.min_stock.label[lang]}
                        name='min_stock'
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <SaveButton lang={lang} />
                    </Form.Item>
                </Info>
            </Form>
        </>
    );
}
