export interface Supplier {
    account_name: string;
    account_no: number;
    address: string;
    bank: string;
    city: string;
    contact: string;
    email: string;
    id?: string;
    name: string;
    npwp: number;
    phone: string;
    province: string;
    status: string;
    zip_code: number;
}

export interface SupplierData extends Supplier {
    key: string;
}
