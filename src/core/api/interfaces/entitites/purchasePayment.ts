export interface PurchasePayment {
    credit_total: number;
    date: string;
    description?: string;
    detail: PurchasePaymentDetail[];
    id?: string;
    no: string;
    payment_method: string;
    payment_no: string;
    payment_total: number;
    status: string;
    supplier?: { name: string };
}

export interface PurchasePaymentDetail {
    id?: string;
    payment_amount: number;
    purchasing?: {
        credit_total: number;
        date: string;
        due_date: string;
        id: string;
        grand_total: number;
        no: string;
    };
}

export interface PurchasePaymentData extends PurchasePayment {
    key: string;
    supplier_name: string;
    updated_name: string;
}

export interface PurchasePaymentListData {
    key?: string;
    no: string;
    date: string;
    due_date: string;
    grand_total: number;
    credit_total: number;
    payment_amount: number;
}
