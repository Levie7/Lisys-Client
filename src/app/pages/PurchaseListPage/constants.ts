export const purchaseListColumns = [
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
    {
        dataIndex: 'due_date',
        key: 'due_date',
        sorter: true,
        title: 'Due Date',
    },
    {
        dataIndex: 'supplier_name',
        key: 'supplier_name',
        title: 'Supplier',
    },
    {
        dataIndex: 'qty_total',
        key: 'qty_total',
        title: 'Qty Total',
    },
    {
        dataIndex: 'grand_total',
        key: 'grand_total',
        title: 'Grand Total',
    },
    {
        dataIndex: 'credit_total',
        key: 'credit_total',
        title: 'Credit Total',
    },
];

export const purchaseDetailColumns = [
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
        dataIndex: 'batch_no',
        key: 'batch_no',
        title: 'Batch No',
    },
    {
        dataIndex: 'expired_date',
        key: 'expired_date',
        title: 'Expired Date',
    },
    {
        dataIndex: 'qty',
        key: 'qty',
        title: 'Qty',
    },
    {
        dataIndex: 'uom',
        key: 'uom',
        title: 'UoM',
    },
    {
        dataIndex: 'buy_price',
        key: 'buy_price',
        title: 'Buy Price',
    },
    {
        dataIndex: 'sell_price',
        key: 'sell_price',
        title: 'Sell Price',
    },
    {
        dataIndex: 'sub_total',
        key: 'sub_total',
        title: 'Sub Total',
    },
];

export const purchaseSearchListColumns = [
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
    {
        dataIndex: 'due_date',
        key: 'due_date',
        sorter: true,
        title: 'Due Date',
    },
    {
        dataIndex: 'grand_total',
        key: 'grand_total',
        title: 'Total',
    },
    {
        dataIndex: 'credit_total',
        key: 'credit_total',
        title: 'Credit Total',
    },
];

export const purchaseWithDetailSearchListColumns = [
    {
        dataIndex: 'no',
        key: 'no',
        sorter: true,
        title: 'Transaction No',
    },
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
        dataIndex: 'qty',
        key: 'qty',
        title: 'Qty',
    },
    {
        dataIndex: 'uom',
        key: 'uom',
        title: 'UoM',
    },
    {
        dataIndex: 'buy_price',
        key: 'buy_price',
        title: 'Buy Price',
    },
    {
        dataIndex: 'credit_total',
        hide: true,
        key: 'credit_total',
        title: 'Credit Total',
    },
];

export const moduleName = 'Purchasing';
export const title = 'Purchase List';
