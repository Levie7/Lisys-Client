export interface Medicine {
    barcode: string;
    buy_price: number;
    category?: { name: string };
    code: string;
    id?: string;
    min_stock: number;
    name: string;
    sell_price: number;
    status: string;
    stock: number;
    uom?: { name: string };
    variant?: { name: string };
}

export interface MedicineAlmostExpired {
    batch_no: string;
    expired_date: string;
    medicine?: { code: string; name: string };
    supplier?: { name: string };
}

export interface MedicineData extends Medicine {
    category_name: string;
    key: string;
    uom_name: string;
    variant_name: string;
}
