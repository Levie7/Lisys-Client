import {
    SalesReturnDetail,
    SalesReturnListData,
    Sales,
    SalesData,
    SalesWithDetailListData,
    SalesWithDetail,
} from 'src/core/api';

import { Currency } from 'src/shared/helpers/formatCurrency';
import { formatCommaValue } from 'src/shared/helpers/formatValue';
import { convertMilisecondsToDate } from 'src/shared/helpers/formatDate';

export function handleSalesData(data?: any): { list: SalesData[]; total: number } {
    let sales = data?.getSalesList.data;
    let total = data?.getSalesList.total;
    if (!sales || !sales.length) {
        return { list: [], total: 0 };
    }

    return {
        list: sales.map((sales: Sales) => {
            return {
                key: sales.id!,
                no: sales.no,
                date: convertMilisecondsToDate(sales.date),
                qty_total: sales.qty_total,
                grand_total: Currency(formatCommaValue(sales.grand_total)),
            };
        }),
        total,
    };
}

export function handleSalesDetailData(
    data?: any
): { list: SalesWithDetailListData[]; total: number } {
    let salesWithDetail = data?.getSalesListWithDetail.data;
    let total = data?.getSalesListWithDetail.total;
    if (!salesWithDetail || !salesWithDetail.length) {
        return { list: [], total: 0 };
    }

    return {
        list: salesWithDetail.map((salesWithDetail: SalesWithDetail) => {
            return {
                key: salesWithDetail.sales_id! + '-' + salesWithDetail.medicine!.id!,
                no: salesWithDetail.no,
                code: salesWithDetail.medicine!.code,
                medicine: salesWithDetail.medicine!.name,
                qty: salesWithDetail.qty,
                uom: salesWithDetail.medicine!.uom!.name,
                sell_price: Currency(formatCommaValue(salesWithDetail.sell_price)),
            };
        }),
        total,
    };
}

export function handleSalesReturnDetail(data?: any): SalesReturnListData[] {
    let salesReturn = data?.getSalesReturnById.detail;
    if (!salesReturn || !salesReturn.length) {
        return [];
    }

    return salesReturn.map((detail: SalesReturnDetail) => {
        let sub_total = detail.qty * detail.sell_price;

        return {
            key: detail.sales!.id + '-' + detail.medicine!.id,
            no: detail.sales!.no,
            code: detail.medicine!.code,
            medicine: detail.medicine!.name,
            qty_sell: detail.qty_sell,
            qty: detail.qty,
            uom: detail.medicine!.uom!.name,
            sell_price: Currency(formatCommaValue(detail.sell_price)),
            sub_total: Currency(formatCommaValue(sub_total)),
        };
    });
}
