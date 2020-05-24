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
                icon: 'medicine_box',
                key: 'Medicine',
                name: 'Medicine',
                status: 'Active',
                url: '/medicine',
            },
            {
                icon: 'uom',
                key: 'Unit of Measurement',
                name: 'Unit of Measurement',
                status: 'Active',
                url: '/uom',
            },
            {
                icon: 'category',
                key: 'Category',
                name: 'Category',
                status: 'Active',
                url: '/category',
            },
            {
                icon: 'variant',
                key: 'Variant',
                name: 'Variant',
                status: 'Active',
                url: '/variant',
            },
            {
                icon: 'supplier',
                key: 'Supplier',
                name: 'Supplier',
                status: 'Active',
                url: '/supplier',
            },
        ],
        icon: 'hdd',
        key: 'Master',
        name: 'Master',
        status: 'Active',
        url: '/master',
    },
    {
        children: [
            {
                icon: 'list',
                key: 'Purchase List',
                name: 'Purchase List',
                status: 'Active',
                url: '/purchase_list',
            },
            {
                icon: 'history',
                key: 'Buy Price History',
                name: 'Buy Price History',
                status: 'Active',
                url: '/buy_price_history',
            },
            {
                icon: 'payment',
                key: 'Purchase Payment',
                name: 'Purchase Payment',
                status: 'Active',
                url: '/purchase_payment',
            },
            {
                icon: 'return',
                key: 'Purchase Return',
                name: 'Purchase Return',
                status: 'Active',
                url: '/purchase_return',
            },
        ],
        icon: 'transaction',
        key: 'Purchasing',
        name: 'Purchasing',
        status: 'Active',
        url: '/purchasing',
    },
];
