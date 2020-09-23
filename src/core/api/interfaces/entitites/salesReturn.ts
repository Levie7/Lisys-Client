export interface SalesReturn {
    date: string;
    description?: string;
    detail: SalesReturnDetail[];
    grand_total: number;
    id?: string;
    no: string;
    qty_total: number;
    status: string;
}

export interface SalesReturnDetail {
    id?: string;
    medicine?: {
        id: string;
        code: string;
        name: string;
        uom?: {
            name: string;
        };
    };
    sales?: {
        id: string;
        no: string;
    };
    qty: number;
    qty_sell: number;
    sell_price: number;
    sub_total: number;
}

export interface SalesReturnData extends SalesReturn {
    key: string;
}

export interface SalesReturnListData {
    key?: string;
    no: string;
    code: string;
    medicine: string;
    qty_sell: number;
    qty: number;
    uom: string;
    sell_price: string;
    sub_total: string;
}
