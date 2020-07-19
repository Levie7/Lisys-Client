export const crudAction = {
    select: { title: { en: 'Select', id: 'Pilih' } },
    read: { title: { en: 'Read', id: 'Lihat' } },
    update: { title: { en: 'Update', id: 'Ubah' } },
    delete: { title: { en: 'Delete', id: 'Hapus' } },
    no_action: { message: { en: 'No Action', id: 'Tidak ada Aksi' } },
};

export const crudColumn = {
    action: { title: { en: 'Action', id: 'Aksi' } },
};

export const filterStatus = {
    en: [
        {
            text: 'Active',
            value: 'active',
        },
        {
            text: 'Inactive',
            value: 'inactive',
        },
    ],
    id: [
        {
            text: 'Aktif',
            value: 'active',
        },
        {
            text: 'Non Aktif',
            value: 'inactive',
        },
    ],
};
