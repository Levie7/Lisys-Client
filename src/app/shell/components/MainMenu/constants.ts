export const logo = {
    dark: {
        alt: 'Lisys-Dark',
        title: 'Lisys Dark',
        url: require('./assets/logo-dark.png'),
    },
    light: {
        alt: 'Lisys-Light',
        title: 'Lisys Light',
        url: require('./assets/logo-light.png'),
    },
};

export const menuData = [
    {
        icon: 'setting',
        key: 'Settings',
        name: 'Settings',
        status: 'Active',
        url: '/settings',
    },
    {
        icon: 'dashboard',
        key: 'Dashboard',
        name: 'Dashboard',
        status: 'Active',
        url: '/',
    },
    {
        children: [
            {
                icon: 'medicine-box',
                key: 'Obat',
                name: 'Obat',
                status: 'Active',
                url: '/',
            },
        ],
        icon: 'hdd',
        key: 'Master',
        name: 'Master',
        status: 'Active',
        url: '/',
    },
];
