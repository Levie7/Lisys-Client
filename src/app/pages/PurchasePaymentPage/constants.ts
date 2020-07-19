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

export const purchasePaymentError = {
    duplicate: {
        en: 'Data already exist!',
        id: 'Data sudah ada!',
    },
    required: {
        en: 'Fill detail first!',
        id: 'Isi detail terlebih dahulu',
    },
};

export const purchasePaymentForm = {
    no: {
        label: { en: 'Transaction No', id: 'No Transaksi' },
    },
    date: {
        label: { en: 'Date', id: 'Tanggal' },
        message: { en: 'Please input the date', id: 'Mohon isi tanggal' },
    },
    supplier: {
        label: { en: 'Supplier', id: 'Pemasok' },
        message: { en: 'Please select the supplier', id: 'Mohon pilih pemasok' },
    },
    payment_method: {
        label: { en: 'Payment Method', id: 'Metode Pembayaran' },
        message: { en: 'Please select the payment method', id: 'Mohon pilih metode pembayaran' },
    },
    payment_no: {
        label: { en: 'Payment No', id: 'No Pembayaran' },
        message: { en: 'Please input the payment no', id: 'Mohon isi no pembayaran' },
    },
    description: {
        label: { en: 'Description', id: 'Deskripsi' },
    },
    payment_amount: {
        label: { en: 'Payment Amount', id: 'Jumlah Pembayaran' },
        message: { en: 'Please input the payment amount', id: 'Mohon isi jumlah pembayaran' },
    },
    purchasing: {
        label: { en: 'Purchasing', id: 'Pembelian' },
    },
};

export const purchasePaymentModal = {
    add: {
        title: { en: 'Add Invoice', id: 'Tambah Nota' },
    },
    update: {
        title: { en: 'Update Invoice', id: 'Perbaharui Nota' },
    },
};

export const purchasePaymentSummary = {
    grand_total: { en: 'Grand Total', id: 'Total Keseluruhan' },
    payment_total: { en: 'Payment Total', id: 'Total Pembayaran' },
    credit_total: { en: 'Credit Total', id: 'Total Kredit' },
};

export const moduleName = 'Purchasing';
export const title = 'Purchase Payment';
