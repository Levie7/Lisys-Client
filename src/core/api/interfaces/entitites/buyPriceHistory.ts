export interface BuyPriceHistory {
    created_date: string;
    id?: string;
    medicine?: { code: string; name: string };
    price: number;
    purchasing?: { no: string };
    supplier?: { name: string };
}

export interface BuyPriceHistoryData extends BuyPriceHistory {
    key: string;
    medicine_code: string;
    medicine_name: string;
    purchasing_no: string;
    supplier_name: string;
}
