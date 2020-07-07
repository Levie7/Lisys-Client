export interface StockCard {
    _id?: string;
    qty_begin: number;
    qty_in: number;
    qty_out: number;
    tag: string;
    transaction_date: string;
    transaction?: {
        detail?: {
            batch_no: string;
            expired_date: string;
        }[];
        no: string;
        supplier?: {
            name: string;
        };
    };
}

export interface StockCardData extends StockCard {
    key: string;
    transaction_no: string | null;
    supplier_name: string | null;
    qty_ending: number;
}
