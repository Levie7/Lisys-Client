import {
    Purchasing,
    PurchasingData,
    PurchasingDetail,
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
