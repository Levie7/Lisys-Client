export const userColumns = [
    {
        dataIndex: 'username',
        key: 'username',
        sorter: true,
        title: { en: 'Username', id: 'Nama Pengguna' },
    },
    {
        dataIndex: 'name',
        key: 'name',
        sorter: true,
        title: { en: 'Name', id: 'Nama' },
    },
    {
        dataIndex: 'role_name',
        key: 'role_name',
        sorter: true,
        title: { en: 'Role', id: 'Peran' },
    },
];

export const userForm = {
    username: {
        label: { en: 'Username', id: 'Nama Pengguna' },
        message: { en: 'Please input the username', id: 'Mohon isi nama pengguna' },
    },
    name: {
        label: { en: 'Name', id: 'Nama' },
        message: { en: 'Please input the name', id: 'Mohon isi nama' },
    },
    password: {
        label: { en: 'Password', id: 'Kata Sandi' },
        message: { en: 'Please input the password', id: 'Mohon isi kata sandi' },
    },
    confirm_password: {
        feedback: {
            en: 'The passwords that you entered do not match!',
            id: 'Kata sandi yang dimasukkan tidak sesuai',
        },
        label: { en: 'Confirm Password', id: 'Konfirmasi Kata Sandi' },
        message: { en: 'Please input the confirm password', id: 'Mohon isi konfirmasi kata sandi' },
    },
    role: {
        label: { en: 'Role', id: 'Peran' },
        message: { en: 'Please input the role', id: 'Mohon isi peran' },
    },
};
