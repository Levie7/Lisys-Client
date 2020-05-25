export interface Purchasing {
    credit_total: number;
    date: string;
    description?: string;
    detail: PurchasingDetail[];
    due_date: string;
    grand_total: number;
    id?: string;
    no: string;
    qty_total: number;
    status: string;
    supplier?: { name: string };
}

export interface PurchasingDetail {
    batch_no: string;
    buy_price: number;
    expired_date: string;
    id?: string;
    medicine?: { code: string; id: string; name: string; uom?: { name: string } };
    qty: number;
    sell_price: number;
    sub_total: number;
}

export interface PurchasingData extends Purchasing {
    key: string;
    medicine_name: string;
    supplier_name: string;
    updated_name: string;
}

export interface PurchasingListData {
    key?: string;
    code: string;
    medicine: string;
    batch_no: string;
    expired_date: string;
    qty: number;
    uom: string;
    buy_price: string;
    sell_price: string;
    sub_total: string;
}

export interface PurchasingWithDetailListData {
    key?: string;
    no: string;
    code: string;
    medicine: string;
    qty: number;
    uom: string;
    buy_price: string;
}
