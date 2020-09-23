import { SalesReturnDetail, SalesReturnListData } from 'src/core/api';

import { Currency } from 'src/shared/helpers/formatCurrency';
import { formatCommaValue } from 'src/shared/helpers/formatValue';

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
