export const userManagementTitle = {
    en: 'User Management',
    id: 'Manajemen Pengguna',
};

export const userManagementForm = [
    {
        button: {
            title: { en: 'Add or Modify Role', id: 'Tambah atau Modifikasi Peran' },
        },
        info: {
            description: {
                en: 'You can add or modify role to set the authority for each user.',
                id: 'Kamu bisa tambah atau modifikasi peran untuk memberikan otoritas tiap user',
            },
            title: { en: 'Role', id: 'Peran' },
        },
        label: { en: 'Active Role', id: 'Peran Aktif' },
        section: 'role',
    },
    {
        button: {
            icon: 'lock',
            title: { en: 'Modify Permission', id: 'Modifikasi Izin' },
        },
        info: {
            description: {
                en:
                    'Manage the permission for each role. You can give Access Menu and User Control.',
                id:
                    'Manajemen izin untuk tiap peran. Kamu bisa memberikan akses menu dan kontrol pengguna',
            },
            title: { en: 'Permission', id: 'Izin' },
        },
        section: 'permission',
    },
    {
        button: {
            title: { en: 'Add or Modify User', id: 'Tambah atau Modifikasi Pengguna' },
        },
        info: {
            description: {
                en: 'List of User in this system. You can add or modify each user',
                id:
                    'Daftar pengguna di sistem ini. Kamu bisa menambahkan atau modifikasi tiap user',
            },
            title: { en: 'User', id: 'Pengguna' },
        },
        label: { en: 'Active User', id: 'Pengguna Aktif' },
        section: 'user',
    },
];
