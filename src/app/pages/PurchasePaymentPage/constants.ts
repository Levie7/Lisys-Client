export const purchasePaymentColumns = [
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
        dataIndex: 'payment_method',
        key: 'payment_method',
        title: { en: 'Payment Method', id: 'Metode Pembayaran' },
    },
    {
        dataIndex: 'payment_no',
        key: 'payment_no',
        title: { en: 'Payment No', id: 'No Pembayaran' },
    },
    {
        dataIndex: 'credit_total',
        key: 'credit_total',
        title: { en: 'Credit Total', id: 'Total Kredit' },
    },
    {
        dataIndex: 'payment_total',
        key: 'payment_total',
        title: { en: 'Payment Total', id: 'Total Pembayaran' },
    },
];

export const purchasePaymentDetailColumns = [
    {
        dataIndex: 'no',
        key: 'no',
        title: { en: 'Transaction No', id: 'No Transaksi' },
    },
    {
        dataIndex: 'date',
        key: 'date',
        title: { en: 'Date', id: 'Tanggal' },
    },
    {
        dataIndex: 'due_date',
        key: 'due_date',
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
    {
        dataIndex: 'payment_amount',
        key: 'payment_amount',
        title: { en: 'Payment Amount', id: 'Jumlah Pembayaran' },
    },
];

export const moduleName = 'Purchasing';
export const title = 'Purchase Payment';
