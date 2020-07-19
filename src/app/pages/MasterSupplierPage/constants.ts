export const alertMessage = {
    en:
        'Please fill these required fields below to create or update supplier data, you can also skip the non required fields.',
    id:
        'Mohon lengkapi semua bidang isian wajib dibawah untuk menambahkan atau memperbaharui data pemasok, kamu juga bisa melewati bidang isian yang tidak wajib',
};

export const supplierColumns = [
    {
        dataIndex: 'name',
        key: 'name',
        sorter: true,
        title: { en: 'Name', id: 'Nama' },
    },
    {
        dataIndex: 'phone',
        key: 'phone',
        title: { en: 'Phone', id: 'Telepon' },
    },
];

export const supplierForm = {
    name: {
        label: { en: 'Name', id: 'Nama' },
        message: { en: 'Please input the name', id: 'Mohon isi nama' },
    },
    phone: {
        label: { en: 'Phone', id: 'Telepon' },
        message: { en: 'Please input the phone', id: 'Mohon isi telepon' },
    },
    contact: {
        label: { en: 'Contact', id: 'Kontak' },
    },
    email: {
        label: { en: 'E-mail', id: 'E-mail' },
    },
    address: {
        label: { en: 'Address', id: 'Alamat' },
    },
    city: {
        label: { en: 'City', id: 'Kota' },
    },
    province: {
        label: { en: 'Province', id: 'Provinsi' },
    },
    zipcode: {
        label: { en: 'Zip Code', id: 'Kode Pos' },
    },
    bank: {
        label: { en: 'Bank', id: 'Bank' },
    },
    account_no: {
        label: { en: 'Account No', id: 'No Akun' },
    },
    account_name: {
        label: { en: 'Account Name', id: 'Nama Akun' },
    },
    npwp: {
        label: { en: 'NPWP', id: 'NPWP' },
    },
};

export const supplierInfo = {
    general: {
        description: {
            en: 'General fields to create or update supplier data',
            id: 'Bidang isian umum untuk membuat atau memperbaharui data pemasok',
        },
        title: { en: 'General Information', id: 'Informasi Umum' },
    },
    bank: {
        description: {
            en: 'Bank fields to add bank and account information about supplier data',
            id: 'Bidang isian bank untuk menambah informasi bank dan akun tentang data pemasok',
        },
        title: { en: 'Bank Information', id: 'Informasi Bank' },
    },
    additional: {
        description: {
            en: 'Additional fields to add more info about supplier data',
            id: 'Bidang isian tambahan untuk menambah informasi tentang data pemasok',
        },
        title: { en: 'Additional Information', id: 'Informasi Tambahan' },
    },
};

export const moduleName = 'Master';
export const title = 'Supplier';
