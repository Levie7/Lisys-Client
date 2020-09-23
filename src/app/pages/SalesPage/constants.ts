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

export const salesButton = {
    pay: { en: 'Pay', id: 'Bayar' },
    new: { en: 'New', id: 'Baru' },
    pending: { en: 'Pending', id: 'Tunda' },
    print: { en: 'Print', id: 'Cetak' },
};

export const salesError = {
    duplicate: {
        en: 'Data already exist!',
        id: 'Data sudah ada!',
    },
    not_found: {
        en: 'Medicine not found!',
        id: 'Obat tidak ditemukan!',
    },
    required: {
        en: 'Fill detail first!',
        id: 'Isi detail terlebih dahulu',
    },
    stock: {
        en: 'Stock is not enough!',
        id: 'Stock tidak mencukupi!',
    },
};

export const salesField = {
    created: { en: 'Created By', id: 'Dibuat Oleh' },
    no: { en: 'Transaction No', id: 'No Transaksi' },
    cashier: { en: 'Cashier', id: 'Kasir' },
    date: { en: 'Date', id: 'Tanggal' },
    payment: { en: 'Payment', id: 'Bayar' },
    change: { en: 'Change', id: 'Kembalian' },
    total: { en: 'Total', id: 'Total' },
    note: {
        en: 'Product that have been purchased cannot be returned unless there is an agreement',
        id: 'Barang yang telah dibeli tidak dapat dikembalikan kecuali ada perjanjian',
    },
};

export const salesForm = {
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
    description: {
        label: { en: 'Description', id: 'Deskripsi' },
    },
    qty: {
        label: { en: 'Qty', id: 'Jumlah' },
        message: { en: 'Please input the qty', id: 'Mohon isi jumlah' },
    },
    payment_amount: {
        label: { en: 'Payment Amount', id: 'Jumlah Pembayaran' },
    },
    medicine: {
        label: { en: 'Medicine', id: 'Obat' },
    },
    code: {
        label: { en: 'Code', id: 'Kode' },
    },
};

export const salesModal = {
    add: {
        title: { en: 'Add Product', id: 'Tambah Produk' },
    },
    update: {
        title: { en: 'Update Product', id: 'Perbaharui Produk' },
    },
};

export const salesSummary = {
    payment: { en: 'Payment', id: 'Pembayaran' },
    grand_total: { en: 'Grand Total', id: 'Total Keseluruhan' },
    paid_total: { en: 'Paid Total', id: 'Total Bayar' },
    change: { en: 'Change', id: 'Kembalian' },
    qty_total: { en: 'Qty Total', id: 'Jumlah Total' },
    total: { en: 'Total', id: 'Total' },
};

export const moduleName = 'Sales';
export const title = 'Sales';
