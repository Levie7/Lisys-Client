export const purchaseReturnColumns = [
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
        title: { en: 'Total', id: 'Total' },
    },
    {
        dataIndex: 'cash_total',
        key: 'cash_total',
        title: { en: 'Cash Total', id: 'Total Tunai' },
    },
    {
        dataIndex: 'credit_discount_total',
        key: 'credit_discount_total',
        title: { en: 'Credit Discount Total', id: 'Total Diskon Kredit' },
    },
];

export const purchaseReturnDetailColumns = [
    {
        dataIndex: 'no',
        key: 'no',
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
        dataIndex: 'qty_buy',
        key: 'qty_buy',
        title: { en: 'Qty Buy', id: 'Jumlah Beli' },
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
        dataIndex: 'discount_amount',
        key: 'discount_amount',
        title: { en: 'Discount Amount', id: 'Jumlah Diskon' },
    },
    {
        dataIndex: 'sub_total',
        key: 'sub_total',
        title: { en: 'Sub Total', id: 'Sub Total' },
    },
];

export const moduleName = 'Purchasing';
export const title = 'Purchase Return';
