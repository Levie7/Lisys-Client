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

export const purchaseError = {
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
};

export const purchaseForm = {
    no: {
        label: { en: 'Transaction No', id: 'No Transaksi' },
        message: { en: 'Please input the transaction no', id: 'Mohon isi no transaksi' },
    },
    date: {
        label: { en: 'Date', id: 'Tanggal' },
        message: { en: 'Please input the date', id: 'Mohon isi tanggal' },
    },
    due_date: {
        label: { en: 'Due Date', id: 'Tanggal Jatuh Tempo' },
        message: { en: 'Please input the due date', id: 'Mohon isi tanggal jatuh tempo' },
    },
    supplier: {
        label: { en: 'Supplier', id: 'Pemasok' },
        message: { en: 'Please select the supplier', id: 'Mohon pilih pemasok' },
    },
    description: {
        label: { en: 'Description', id: 'Deskripsi' },
    },
    code: {
        label: { en: 'Code', id: 'Kode' },
    },
    qty: {
        label: { en: 'Qty', id: 'Jumlah' },
        message: { en: 'Please input the qty', id: 'Mohon isi jumlah' },
    },
    buy_price: {
        label: { en: 'Buy Price', id: 'Harga Beli' },
        message: { en: 'Please input the buy price', id: 'Mohon isi harga beli' },
    },
    sell_price: {
        label: { en: 'Sell Price', id: 'Harga Jual' },
        message: { en: 'Please input the sell price', id: 'Mohon isi harga jual' },
    },
    batch_no: {
        label: { en: 'Batch No', id: 'No Batch' },
        message: { en: 'Please input the batch no', id: 'Mohon isi no batch' },
    },
    expired_date: {
        label: { en: 'Expired Date', id: 'Tanggal Kadaluwarsa' },
        message: { en: 'Please input the expired date', id: 'Mohon isi tanggal kadaluwarsa' },
    },
};

export const purchaseModal = {
    add: {
        title: { en: 'Add Product', id: 'Tambah Produk' },
    },
    update: {
        title: { en: 'Update Product', id: 'Perbaharui Produk' },
    },
};

export const purchaseSummary = {
    grand_total: { en: 'Grand Total', id: 'Total Keseluruhan' },
    qty_total: { en: 'Qty Total', id: 'Jumlah Total' },
    total: { en: 'Total', id: 'Total' },
    credit_total: { en: 'Credit Total', id: 'Total Kredit' },
};

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
