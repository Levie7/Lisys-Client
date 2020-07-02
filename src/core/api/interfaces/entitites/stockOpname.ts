export interface StockOpname {
    date: string;
    description?: string;
    detail: StockOpnameDetail[];
    id?: string;
    no: string;
    status: string;
}

export interface StockOpnameData extends StockOpname {
    key: string;
}

export interface StockOpnameDetail {
    difference: number;
    id?: string;
    medicine?: { code: string; id: string; name: string; uom?: { name: string } };
    physical_stock: number;
    system_stock: number;
}

export interface StockOpnameListData {
    key?: string;
    code: string;
    medicine: string;
    uom: string;
    system_stock: number;
    physical_stock: number;
    difference: number;
}
