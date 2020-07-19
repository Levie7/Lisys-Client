export const alertMessage = {
    en:
        'Please fill these required fields below to create or update stock opname data, you can also skip the non required fields.',
    id:
        'Mohon lengkapi semua bidang isian wajib dibawah untuk menambahkan atau memperbaharui data stok opname, kamu juga bisa melewati bidang isian yang tidak wajib',
};

export const stockOpnameColumns = [
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
];

export const stockOpnameDetailColumns = [
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
        dataIndex: 'uom',
        key: 'uom',
        title: { en: 'UoM', id: 'Satuan' },
    },
    {
        dataIndex: 'system_stock',
        key: 'system_stock',
        title: { en: 'System Stock', id: 'Stok Sistem' },
    },
    {
        dataIndex: 'physical_stock',
        key: 'physical_stock',
        title: { en: 'Physical Stock', id: 'Stok Fisik' },
    },
    {
        dataIndex: 'difference',
        key: 'difference',
        title: { en: 'Difference', id: 'Selisih' },
    },
];

export const stockOpnameError = {
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

export const stockOpnameForm = {
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
    code: {
        label: { en: 'Code', id: 'Kode' },
    },
    physical_stock: {
        label: { en: 'Physical Stock', id: 'Stok Fisik' },
    },
};

export const stockOpnameModal = {
    add: {
        title: { en: 'Add Product', id: 'Tambah Produk' },
    },
    update: {
        title: { en: 'Update Product', id: 'Perbaharui Produk' },
    },
};

export const moduleName = 'Stock';
export const title = 'Stock Opname';
