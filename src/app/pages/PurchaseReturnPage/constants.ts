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

export const purchaseReturnError = {
    duplicate: {
        en: 'Data already exist!',
        id: 'Data sudah ada!',
    },
    qty: {
        en: 'Qty of items is more than qty purchase',
        id: 'Jumlah barang lebih banyak daripada jumlah beli',
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

export const purchaseReturnForm = {
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
    purchasing: {
        label: { en: 'Purchasing', id: 'Pembelian' },
    },
};

export const purchaseReturnModal = {
    add: {
        title: { en: 'Add Product', id: 'Tambah Produk' },
    },
    update: {
        title: { en: 'Update Product', id: 'Perbaharui Produk' },
    },
};

export const purchaseReturnSummary = {
    grand_total: { en: 'Grand Total', id: 'Total Keseluruhan' },
    payment_total: { en: 'Payment Total', id: 'Total Pembayaran' },
    credit_total: { en: 'Credit Total', id: 'Total Kredit' },
    cash_total: { en: 'Cash Total', id: 'Total Tunai' },
    qty_total: { en: 'Qty Total', id: 'Jumlah Total' },
    total: { en: 'Total', id: 'Total' },
};

export const moduleName = 'Purchasing';
export const title = 'Purchase Return';
