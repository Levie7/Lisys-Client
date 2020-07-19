export const roleColumns = [
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

export const roleForms = {
    name: {
        label: { en: 'Role Name', id: 'Nama Peran' },
        message: { en: 'Please input the role name', id: 'Mohon isi nama peran' },
    },
    description: {
        label: { en: 'Description', id: 'Deskripsi' },
    },
};
