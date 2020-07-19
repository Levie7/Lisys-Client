export const salesListColumns = [
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
        dataIndex: 'payment_total',
        key: 'payment_total',
        title: { en: 'Payment Total', id: 'Total Pembayaran' },
    },
    {
        dataIndex: 'change_total',
        key: 'change_total',
        title: { en: 'Change Total', id: 'Total Kembalian' },
    },
];

export const salesDetailColumns = [
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

export const moduleName = 'Sales';
export const title = 'Sales';
