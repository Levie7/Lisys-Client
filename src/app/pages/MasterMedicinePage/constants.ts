export const alertMessage = {
    en:
        'Please fill these required fields below to create or update medicine data, you can also skip the non required fields.',
    id:
        'Mohon lengkapi semua bidang isian wajib dibawah untuk menambahkan atau memperbaharui data obat, kamu juga bisa melewati bidang isian yang tidak wajib',
};

export const medicineColumns = [
    {
        dataIndex: 'code',
        key: 'code',
        sorter: true,
        title: { en: 'Code', id: 'Kode' },
    },
    {
        dataIndex: 'name',
        key: 'name',
        sorter: true,
        title: { en: 'Name', id: 'Nama' },
    },
    {
        dataIndex: 'stock',
        key: 'stock',
        sorter: true,
        title: { en: 'Stock', id: 'Stok' },
    },
    {
        dataIndex: 'variant_name',
        key: 'variant_name',
        title: { en: 'Variant', id: 'Varian' },
    },
    {
        dataIndex: 'category_name',
        key: 'category_name',
        title: { en: 'Category', id: 'Kategori' },
    },
    {
        dataIndex: 'uom_name',
        key: 'uom_name',
        title: { en: 'UoM', id: 'Satuan' },
    },
    {
        dataIndex: 'buy_price',
        key: 'buy_price',
        sorter: true,
        title: { en: 'Buy Price', id: 'Harga Beli' },
    },
    {
        dataIndex: 'sell_price',
        key: 'sell_price',
        sorter: true,
        title: { en: 'Sell Price', id: 'Harga Jual' },
    },
    {
        dataIndex: 'barcode',
        key: 'barcode',
        title: { en: 'Barcode', id: 'Barcode' },
    },
];

export const medicineError = {
    percentage: {
        en: 'Please fill the buy price first',
        id: 'Mohon isi harga beli terlebih dahulu',
    },
    sell_price: {
        en: 'Please fill the buy price first',
        id: 'Mohon isi harga beli terlebih dahulu',
    },
};

export const medicineForm = {
    code: {
        label: { en: 'Code', id: 'Kode' },
        message: { en: 'Please input the code', id: 'Mohon isi kode' },
    },
    name: {
        label: { en: 'Name', id: 'Nama' },
        message: { en: 'Please input the name', id: 'Mohon isi nama' },
    },
    variant: {
        label: { en: 'Variant', id: 'Varian' },
        message: { en: 'Please select the variant', id: 'Mohon pilih varian' },
    },
    category: {
        label: { en: 'Category', id: 'Kategori' },
        message: { en: 'Please select the category', id: 'Mohon pilih kategori' },
    },
    uom: {
        label: { en: 'UoM', id: 'Satuan' },
        message: { en: 'Please select the uom', id: 'Mohon pilih satuan' },
    },
    buy_price: {
        label: { en: 'Buy Price', id: 'Harga Beli' },
        message: { en: 'Please input buy price', id: 'Mohon isi harga beli' },
    },
    sell_price: {
        label: { en: 'Sell Price', id: 'Harga Jual' },
        message: { en: 'Please input sell price', id: 'Mohon isi harga jual' },
    },
    barcode: {
        label: { en: 'Barcode', id: 'Barcode' },
        message: { en: 'Please input the code', id: 'Mohon isi kode' },
    },
    min_stock: {
        label: { en: 'Min Stock', id: 'Minimal Stok' },
        message: { en: 'Please input the code', id: 'Mohon isi kode' },
    },
};

export const medicineSearchListColumns = [
    {
        dataIndex: 'code',
        key: 'code',
        sorter: true,
        title: { en: 'Code', id: 'Kode' },
    },
    {
        dataIndex: 'name',
        key: 'name',
        sorter: true,
        title: { en: 'Name', id: 'Nama' },
    },
    {
        dataIndex: 'stock',
        key: 'stock',
        sorter: true,
        title: { en: 'Stock', id: 'Stok' },
    },
    {
        dataIndex: 'uom_name',
        key: 'uom_name',
        title: { en: 'UoM', id: 'Satuan' },
    },
    {
        dataIndex: 'buy_price',
        key: 'buy_price',
        sorter: true,
        title: { en: 'Buy Price', id: 'Harga Beli' },
    },
    {
        dataIndex: 'sell_price',
        key: 'sell_price',
        sorter: true,
        title: { en: 'Sell Price', id: 'Harga Jual' },
    },
];

export const medicineInfo = {
    general: {
        description: {
            en: 'General fields to create or update medicine data',
            id: 'Bidang isian umum untuk membuat atau memperbaharui data obat',
        },
        title: { en: 'General Information', id: 'Informasi Umum' },
    },
    inventory: {
        description: {
            en: 'Inventory fields to add inventory (stock) info about medicine data',
            id: 'Bidang isian persediaan untuk menambah stok persediaan tentang data obat',
        },
        title: { en: 'Inventory Information', id: 'Informasi Persediaan' },
    },
    pricing: {
        description: {
            en: 'Pricing fields to add buy and sell information about medicine data',
            id: 'Bidang isian harga untuk menambah informasi beli dan jual tentang data obat',
        },
        title: { en: 'Pricing Information', id: 'Informasi Harga' },
    },
};

export const moduleName = 'Master';
export const title = 'Medicine';
