export interface Sales {
    change_total: number;
    created_by?: { name: string };
    created_date: string;
    date: string;
    description?: string;
    detail: SalesDetail[];
    grand_total: number;
    id?: string;
    no: string;
    payment_total: number;
    qty_total: number;
    status: string;
}

export interface SalesByPeriod {
    _id: string;
    grand_total: number;
}

export interface SalesDetail {
    id?: string;
    medicine?: { code: string; id: string; name: string; uom?: { name: string } };
    qty: number;
    sell_price: number;
    sub_total: number;
}

export interface SalesData extends Sales {
    key: string;
    medicine_name: string;
    updated_name: string;
}

export interface SalesListData {
    key?: string;
    code: string;
    medicine: string;
    qty: number;
    uom: string;
    sell_price: string;
    sub_total: string;
}

export interface SalesWithDetailListData {
    code: string;
    key?: string;
    medicine: string;
    no: string;
    qty: number;
    uom: string;
    sell_price: string;
}

export interface SoldMedicine {
    date: string;
    medicine?: { code: string; name: string };
    sold: number;
}

export interface SummarySales {
    created_by?: {
        name: string;
    };
    date: string;
    grand_total: number;
    sold: number;
    transaction: number;
}
