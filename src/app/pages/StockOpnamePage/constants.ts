export const alertMessage =
    'Please fill these required fields below to create or update stock opname data, you can also skip the non required fields.';

export const stockOpnameColumns = [
    {
        dataIndex: 'no',
        key: 'no',
        sorter: true,
        title: 'Transaction No',
    },
    {
        dataIndex: 'date',
        key: 'date',
        sorter: true,
        title: 'Date',
    },
];

export const stockOpnameDetailColumns = [
    {
        dataIndex: 'code',
        key: 'code',
        title: 'Code',
    },
    {
        dataIndex: 'medicine',
        key: 'medicine',
        title: 'Medicine',
    },
    {
        dataIndex: 'uom',
        key: 'uom',
        title: 'UoM',
    },
    {
        dataIndex: 'system_stock',
        key: 'system_stock',
        title: 'System Stock',
    },
    {
        dataIndex: 'physical_stock',
        key: 'physical_stock',
        title: 'Physical Stock',
    },
    {
        dataIndex: 'difference',
        key: 'difference',
        title: 'Difference',
    },
];

export const moduleName = 'Stock';
export const title = 'Stock Opname';
