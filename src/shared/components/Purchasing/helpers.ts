import {
    PurchasePaymentDetail,
    PurchasePaymentListData,
    PurchaseReturnDetail,
    PurchaseReturnListData,
    Purchasing,
    PurchasingData,
    PurchasingDetail,
    PurchasingListData,
    PurchasingWithDetailListData,
} from 'src/core/api';

import { Currency } from 'src/shared/helpers/formatCurrency';
import { convertMilisecondsToDate } from 'src/shared/helpers/formatDate';
import { formatCommaValue } from 'src/shared/helpers/formatValue';

export function handlePurchasingData(data?: any): { list: PurchasingData[]; total: number } {
    let purchasing = data?.getPurchasingList.data;
    let total = data?.getPurchasingList.total;
    if (!purchasing || !purchasing.length) {
        return { list: [], total: 0 };
    }

    return {
        list: purchasing.map((purchasing: Purchasing) => {
            return {
                key: purchasing.id!,
                no: purchasing.no,
                date: convertMilisecondsToDate(purchasing.date),
                due_date: convertMilisecondsToDate(purchasing.due_date),
                supplier_name: purchasing.supplier!.name,
                qty_total: purchasing.qty_total,
                grand_total: Currency(formatCommaValue(purchasing.grand_total)),
                credit_total: Currency(formatCommaValue(purchasing.credit_total)),
            };
        }),
        total,
    };
}

export function handlePurchasingDetailData(
    data?: any
): { list: PurchasingWithDetailListData[]; total: number } {
    let purchasing = data?.getPurchasingList.data;
    let total = data?.getPurchasingList.total;
    if (!purchasing || !purchasing.length) {
        return { list: [], total: 0 };
    }

    let header: PurchasingWithDetailListData[] = [];
    purchasing.map((purchase: Purchasing) => {
        purchase.detail.map((detail: PurchasingDetail) => {
            header.push({
                key: purchase.id! + '-' + detail.medicine!.id!,
                no: purchase.no,
                code: detail.medicine!.code,
                medicine: detail.medicine!.name,
                qty: detail.qty,
                uom: detail.medicine!.uom!.name,
                buy_price: Currency(formatCommaValue(detail.buy_price)),
                credit_total: Currency(formatCommaValue(purchase.credit_total)),
            });
        });
    });

    return {
        list: header,
        total,
    };
}

export function handlePurchaseListDetail(data?: any): PurchasingListData[] {
    let purchasing = data?.getPurchasingById.detail;
    if (!purchasing || !purchasing.length) {
        return [];
    }

    return purchasing.map((detail: PurchasingDetail) => {
        return {
            key: detail.medicine!.id,
            code: detail.medicine!.code,
            medicine: detail.medicine!.name,
            batch_no: detail.batch_no,
            expired_date: convertMilisecondsToDate(detail.expired_date),
            qty: detail.qty,
            uom: detail.medicine!.uom!.name,
            buy_price: Currency(formatCommaValue(detail.buy_price)),
            sell_price: Currency(formatCommaValue(detail.sell_price)),
            sub_total: Currency(formatCommaValue(detail.sub_total)),
        };
    });
}

export function handlePurchasePaymentDetail(data?: any): PurchasePaymentListData[] {
    let purchasePayment = data?.getPurchasePaymentById.detail;
    if (!purchasePayment || !purchasePayment.length) {
        return [];
    }

    return purchasePayment.map((detail: PurchasePaymentDetail) => {
        return {
            key: detail.purchasing!.id,
            no: detail.purchasing!.no,
            date: convertMilisecondsToDate(detail.purchasing!.date),
            due_date: convertMilisecondsToDate(detail.purchasing!.due_date),
            grand_total: Currency(formatCommaValue(detail.purchasing!.grand_total)),
            credit_total: Currency(formatCommaValue(detail.purchasing!.credit_total)),
            payment_amount: Currency(formatCommaValue(detail.payment_amount)),
        };
    });
}

export function handlePurchaseReturnDetail(data?: any): PurchaseReturnListData[] {
    let purchaseReturn = data?.getPurchaseReturnById.detail;
    if (!purchaseReturn || !purchaseReturn.length) {
        return [];
    }

    return purchaseReturn.map((detail: PurchaseReturnDetail) => {
        let sub_total = detail.qty * detail.buy_price;

        return {
            key: detail.purchasing!.id + '-' + detail.medicine!.id,
            no: detail.purchasing!.no,
            code: detail.medicine!.code,
            medicine: detail.medicine!.name,
            qty_buy: detail.qty_buy,
            qty: detail.qty,
            uom: detail.medicine!.uom!.name,
            buy_price: Currency(formatCommaValue(detail.buy_price)),
            discount_amount: Currency(formatCommaValue(detail.discount_amount)),
            sub_total: Currency(formatCommaValue(sub_total)),
        };
    });
}
