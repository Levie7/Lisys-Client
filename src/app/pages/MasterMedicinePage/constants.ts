export const alertMessage =
    'Please fill these required fields below to create or update medicine data, you can also skip the non required fields.';

export const medicineColumns = [
    {
        dataIndex: 'code',
        key: 'code',
        sorter: true,
        title: 'Code',
    },
    {
        dataIndex: 'name',
        key: 'name',
        sorter: true,
        title: 'Name',
    },
    {
        dataIndex: 'stock',
        key: 'stock',
        sorter: true,
        title: 'Stock',
    },
    {
        dataIndex: 'variant_name',
        key: 'variant_name',
        title: 'Variant',
    },
    {
        dataIndex: 'category_name',
        key: 'category_name',
        title: 'Category',
    },
    {
        dataIndex: 'uom_name',
        key: 'uom_name',
        title: 'UoM',
    },
    {
        dataIndex: 'buy_price',
        key: 'buy_price',
        sorter: true,
        title: 'Buy Price',
    },
    {
        dataIndex: 'sell_price',
        key: 'sell_price',
        sorter: true,
        title: 'Sell Price',
    },
    {
        dataIndex: 'barcode',
        key: 'barcode',
        title: 'Barcode',
    },
];

export const medicineSearchListColumns = [
    {
        dataIndex: 'code',
        key: 'code',
        sorter: true,
        title: 'Code',
    },
    {
        dataIndex: 'name',
        key: 'name',
        sorter: true,
        title: 'Name',
    },
    {
        dataIndex: 'stock',
        key: 'stock',
        sorter: true,
        title: 'Stock',
    },
    {
        dataIndex: 'uom_name',
        key: 'uom_name',
        title: 'UoM',
    },
    {
        dataIndex: 'buy_price',
        key: 'buy_price',
        sorter: true,
        title: 'Buy Price',
    },
    {
        dataIndex: 'sell_price',
        key: 'sell_price',
        sorter: true,
        title: 'Sell Price',
    },
];

export const medicineInfo = {
    general: {
        description: 'General important fields to create or update medicine data',
        title: 'General Information',
    },
    inventory: {
        description: 'Inventory fields to add inventory (stock) info about medicine data',
        title: 'Inventory Information',
    },
    pricing: {
        description: 'Pricing fields to add buy and sell information about medicine data',
        title: 'Pricing Information',
    },
};
