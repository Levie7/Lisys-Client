export const alertMessage =
    'Please fill these required fields below to create or update medicine data, you can also skip the non required fields.';

export const medicineColumns = [
    {
        dataIndex: 'code',
        key: 'code',
        sorter: true,
        title: { en: 'Code', id: 'Kode' },
    },
    {
        dataIndex: 'name',
        key: 'name',
        sorter: true,
        title: { en: 'Name', id: 'Nama' },
    },
    {
        dataIndex: 'stock',
        key: 'stock',
        sorter: true,
        title: { en: 'Stock', id: 'Stok' },
    },
    {
        dataIndex: 'variant_name',
        key: 'variant_name',
        title: { en: 'Variant', id: 'Varian' },
    },
    {
        dataIndex: 'category_name',
        key: 'category_name',
        title: { en: 'Category', id: 'Kategori' },
    },
    {
        dataIndex: 'uom_name',
        key: 'uom_name',
        title: { en: 'UoM', id: 'Satuan' },
    },
    {
        dataIndex: 'buy_price',
        key: 'buy_price',
        sorter: true,
        title: { en: 'Buy Price', id: 'Harga Beli' },
    },
    {
        dataIndex: 'sell_price',
        key: 'sell_price',
        sorter: true,
        title: { en: 'Sell Price', id: 'Harga Jual' },
    },
    {
        dataIndex: 'barcode',
        key: 'barcode',
        title: { en: 'Barcode', id: 'Barcode' },
    },
];

export const medicineSearchListColumns = [
    {
        dataIndex: 'code',
        key: 'code',
        sorter: true,
        title: { en: 'Code', id: 'Kode' },
    },
    {
        dataIndex: 'name',
        key: 'name',
        sorter: true,
        title: { en: 'Name', id: 'Nama' },
    },
    {
        dataIndex: 'stock',
        key: 'stock',
        sorter: true,
        title: { en: 'Stock', id: 'Stok' },
    },
    {
        dataIndex: 'uom_name',
        key: 'uom_name',
        title: { en: 'UoM', id: 'Satuan' },
    },
    {
        dataIndex: 'buy_price',
        key: 'buy_price',
        sorter: true,
        title: { en: 'Buy Price', id: 'Harga Beli' },
    },
    {
        dataIndex: 'sell_price',
        key: 'sell_price',
        sorter: true,
        title: { en: 'Sell Price', id: 'Harga Jual' },
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

export const moduleName = 'Master';
export const title = 'Medicine';
