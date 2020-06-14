export interface PurchaseReturn {
    cash_total: number;
    credit_discount_total: number;
    date: string;
    description?: string;
    detail: PurchaseReturnDetail[];
    grand_total: number;
    id?: string;
    no: string;
    qty_total: number;
    status: string;
    supplier?: { name: string };
}

export interface PurchaseReturnDetail {
    buy_price: number;
    discount_amount: number;
    id?: string;
    medicine?: {
        id: string;
        code: string;
        name: string;
        uom?: {
            name: string;
        };
    };
    purchasing?: {
        id: string;
        no: string;
    };
    qty: number;
    qty_buy: number;
}

export interface PurchaseReturnData extends PurchaseReturn {
    key: string;
    supplier_name: string;
    updated_name: string;
}

export interface PurchaseReturnListData {
    key?: string;
    no: string;
    code: string;
    medicine: string;
    qty_buy: number;
    qty: number;
    uom: string;
    buy_price: string;
    discount_amount: string;
    sub_total: string;
}
