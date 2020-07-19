export const alertMessage = {
    en:
        'Please fill these required fields below to create or update UoM data, you can also skip the non required fields.',
    id:
        'Mohon lengkapi semua bidang isian wajib dibawah untuk menambahkan atau memperbaharui data satuan, kamu juga bisa melewati bidang isian yang tidak wajib',
};

export const uomColumns = [
    {
        dataIndex: 'name',
        key: 'name',
        sorter: true,
        title: { en: 'Name', id: 'Nama' },
    },
    {
        dataIndex: 'description',
        key: 'description',
        sorter: true,
        title: { en: 'Description', id: 'Deskripsi' },
    },
];

export const uomForm = {
    name: {
        label: { en: 'Name', id: 'Nama' },
        message: { en: 'Please input the name', id: 'Mohon isi nama' },
    },
    description: {
        label: { en: 'Description', id: 'Deskripsi' },
    },
};

export const uomInfo = {
    general: {
        description: {
            en: 'General fields to create or update uom data',
            id: 'Bidang isian umum untuk membuat atau memperbaharui data satuan',
        },
        title: { en: 'General Information', id: 'Informasi Umum' },
    },
};

export const moduleName = 'Master';
export const title = 'Unit of Measurement';
