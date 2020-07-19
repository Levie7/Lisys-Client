export const purchaseListColumns = [
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
    {
        dataIndex: 'due_date',
        key: 'due_date',
        sorter: true,
        title: { en: 'Due Date', id: 'Tanggal Jatuh Tempo' },
    },
    {
        dataIndex: 'supplier_name',
        key: 'supplier_name',
        title: { en: 'Supplier', id: 'Pemasok' },
    },
    {
        dataIndex: 'qty_total',
        key: 'qty_total',
        title: { en: 'Qty Total', id: 'Jumlah Total' },
    },
    {
        dataIndex: 'grand_total',
        key: 'grand_total',
        title: { en: 'Grand Total', id: 'Total Keseluruhan' },
    },
    {
        dataIndex: 'credit_total',
        key: 'credit_total',
        title: { en: 'Credit Total', id: 'Total Kredit' },
    },
];

export const purchaseDetailColumns = [
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
        dataIndex: 'batch_no',
        key: 'batch_no',
        title: { en: 'Batch No', id: 'No Batch' },
    },
    {
        dataIndex: 'expired_date',
        key: 'expired_date',
        title: { en: 'Expired Date', id: 'Tanggal Kadaluwarsa' },
    },
    {
        dataIndex: 'qty',
        key: 'qty',
        title: { en: 'Qty', id: 'Jumlah' },
    },
    {
        dataIndex: 'uom',
        key: 'uom',
        title: { en: 'UoM', id: 'Satuan' },
    },
    {
        dataIndex: 'buy_price',
        key: 'buy_price',
        title: { en: 'Buy Price', id: 'Harga Beli' },
    },
    {
        dataIndex: 'sell_price',
        key: 'sell_price',
        title: { en: 'Sell Price', id: 'Harga Jual' },
    },
    {
        dataIndex: 'sub_total',
        key: 'sub_total',
        title: { en: 'Sub Total', id: 'Sub Total' },
    },
];

export const purchaseSearchListColumns = [
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
    {
        dataIndex: 'due_date',
        key: 'due_date',
        sorter: true,
        title: { en: 'Due Date', id: 'Tanggal Jatuh Tempo' },
    },
    {
        dataIndex: 'grand_total',
        key: 'grand_total',
        title: { en: 'Total', id: 'Total' },
    },
    {
        dataIndex: 'credit_total',
        key: 'credit_total',
        title: { en: 'Credit Total', id: 'Total Kredit' },
    },
];

export const purchaseWithDetailSearchListColumns = [
    {
        dataIndex: 'no',
        key: 'no',
        sorter: true,
        title: { en: 'Transaction No', id: 'No Transaksi' },
    },
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
        dataIndex: 'qty',
        key: 'qty',
        title: { en: 'Qty', id: 'Jumlah' },
    },
    {
        dataIndex: 'uom',
        key: 'uom',
        title: { en: 'UoM', id: 'Satuan' },
    },
    {
        dataIndex: 'buy_price',
        key: 'buy_price',
        title: { en: 'Buy Price', id: 'Harga Beli' },
    },
    {
        dataIndex: 'credit_total',
        hide: true,
        key: 'credit_total',
        title: { en: 'Credit Total', id: 'Total Kredit' },
    },
];

export const moduleName = 'Purchasing';
export const title = 'Purchase List';
