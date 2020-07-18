export const alertMessage =
    'Please fill these required fields below to create or update supplier data, you can also skip the non required fields.';

export const supplierColumns = [
    {
        dataIndex: 'name',
        key: 'name',
        sorter: true,
        title: 'Name',
    },
    {
        dataIndex: 'phone',
        key: 'phone',
        title: 'Phone',
    },
];

export const supplierInfo = {
    additional: {
        description: 'Additional fields to add more info about supplier data',
        title: 'Additional Information',
    },
    bank: {
        description: 'Bank fields to add bank and account information about supplier data',
        title: 'Bank Information',
    },
    general: {
        description: 'General important fields to create or update supplier data',
        title: 'General Information',
    },
};

export const moduleName = 'Master';
export const title = 'Supplier';
