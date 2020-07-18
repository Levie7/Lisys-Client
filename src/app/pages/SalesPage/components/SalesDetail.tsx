import * as React from 'react';

import { SalesDetail as SalesDetailAPI, StockOpnameListData } from 'src/core/api';

import { CrudListTable } from 'src/shared/components/Crud/CrudList/CrudListTable';
import { Currency } from 'src/shared/helpers/formatCurrency';
import { formatCommaValue } from 'src/shared/helpers/formatValue';

import { salesDetailColumns } from '../constants';

interface SalesDetailProps {
    data: any;
}

export const SalesDetail = React.memo<SalesDetailProps>(({ data }) => {
    let detail = handleSalesDetail(data);

    function handleSalesDetail(data?: any): StockOpnameListData[] {
        let detail = data?.getSalesById.detail;
        if (!detail || !detail.length) {
            return [];
        }

        return detail.map((detail: SalesDetailAPI) => {
            let sub_total = detail.qty * detail.sell_price;

            return {
                key: detail.medicine!.id,
                code: detail.medicine!.code,
                medicine: detail.medicine!.name,
                qty: detail.qty,
                uom: detail.medicine!.uom!.name,
                sell_price: Currency(formatCommaValue(detail.sell_price)),
                sub_total: Currency(formatCommaValue(sub_total)),
            };
        });
    }

    return (
        <div className='col-12'>
            <CrudListTable columns={salesDetailColumns} dataSource={detail} />
        </div>
    );
});
