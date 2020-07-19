import * as React from 'react';

import { Lang, StockOpnameDetail as StockOpnameDetailAPI, StockOpnameListData } from 'src/core/api';

import { CrudListTable } from 'src/shared/components/Crud/CrudList/CrudListTable';

import { stockOpnameDetailColumns } from '../constants';

export interface StockOpnameDetailProps extends Lang {
    data: any;
}

export const StockOpnameDetail = React.memo<StockOpnameDetailProps>(({ data, ...props }) => {
    let detail = handleStockOpnameDetail(data);

    function handleStockOpnameDetail(data?: any): StockOpnameListData[] {
        let detail = data?.getStockOpnameById.detail;
        if (!detail || !detail.length) {
            return [];
        }

        return detail.map((detail: StockOpnameDetailAPI) => {
            return {
                key: detail.medicine!.id,
                code: detail.medicine!.code,
                medicine: detail.medicine!.name,
                uom: detail.medicine!.uom!.name,
                system_stock: detail.system_stock,
                physical_stock: detail.physical_stock,
                difference: detail.difference,
            };
        });
    }

    return (
        <div className='col-12'>
            <CrudListTable {...props} columns={stockOpnameDetailColumns} dataSource={detail} />
        </div>
    );
});
