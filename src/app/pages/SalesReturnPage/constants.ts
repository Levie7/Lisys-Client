export const salesReturnColumns = [
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
        title: { en: 'Total', id: 'Total' },
    },
];

export const salesReturnDetailColumns = [
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
        dataIndex: 'qty_sell',
        key: 'qty_sell',
        title: { en: 'Qty Sell', id: 'Jumlah Jual' },
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

export const salesReturnError = {
    duplicate: {
        en: 'Data already exist!',
        id: 'Data sudah ada!',
    },
    qty: {
        en: 'Qty of items is more than qty sell',
        id: 'Jumlah barang lebih banyak daripada jumlah jual',
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

export const salesReturnForm = {
    no: {
        label: { en: 'Transaction No', id: 'No Transaksi' },
    },
    date: {
        label: { en: 'Date', id: 'Tanggal' },
        message: { en: 'Please input the date', id: 'Mohon isi tanggal' },
    },
    description: {
        label: { en: 'Description', id: 'Deskripsi' },
    },
    qty: {
        label: { en: 'Qty', id: 'Jumlah' },
        message: { en: 'Please input the qty', id: 'Mohon isi jumlah' },
    },
    sales: {
        label: { en: 'Sales', id: 'Penjualan' },
    },
};

export const salesReturnModal = {
    add: {
        title: { en: 'Add Product', id: 'Tambah Produk' },
    },
    update: {
        title: { en: 'Update Product', id: 'Perbaharui Produk' },
    },
};

export const salesReturnSummary = {
    grand_total: { en: 'Grand Total', id: 'Total Keseluruhan' },
    qty_total: { en: 'Qty Total', id: 'Jumlah Total' },
    total: { en: 'Total', id: 'Total' },
};

export const moduleName = 'Sales';
export const title = 'Sales Return';
