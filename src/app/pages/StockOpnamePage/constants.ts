export const alertMessage =
    'Please fill these required fields below to create or update stock opname data, you can also skip the non required fields.';

export const stockOpnameColumns = [
    {
        dataIndex: 'no',
        key: 'no',
        sorter: true,
        title: { en: 'Transaction No', id: 'No Transaksi' },
    },
    {
        dataIndex: 'date',
        key: 'date',
        sorter: true,
        title: { en: 'Date', id: 'Tanggal' },
    },
];

export const stockOpnameDetailColumns = [
    {
        dataIndex: 'code',
        key: 'code',
        title: { en: 'Code', id: 'Kode' },
    },
    {
        dataIndex: 'medicine',
        key: 'medicine',
        title: { en: 'Medicine', id: 'Obat' },
    },
    {
        dataIndex: 'uom',
        key: 'uom',
        title: { en: 'UoM', id: 'Satuan' },
    },
    {
        dataIndex: 'system_stock',
        key: 'system_stock',
        title: { en: 'System Stock', id: 'Stok Sistem' },
    },
    {
        dataIndex: 'physical_stock',
        key: 'physical_stock',
        title: { en: 'Physical Stock', id: 'Stok Fisik' },
    },
    {
        dataIndex: 'difference',
        key: 'difference',
        title: { en: 'Difference', id: 'Selisih' },
    },
];

export const moduleName = 'Stock';
export const title = 'Stock Opname';
