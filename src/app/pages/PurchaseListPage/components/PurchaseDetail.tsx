import * as React from 'react';

import { Lang } from 'src/core/api';

import { CrudListTable } from 'src/shared/components/Crud/CrudList/CrudListTable';
import { handlePurchaseListDetail } from 'src/shared/components/Purchasing/helpers';

import { purchaseDetailColumns } from '../constants';

export interface PurchaseDetailProps extends Lang {
    data: any;
}

export const PurchaseDetail = React.memo<PurchaseDetailProps>(({ data, ...props }) => {
    let detail = handlePurchaseListDetail(data);

    return (
        <div className='col-12'>
            <CrudListTable {...props} columns={purchaseDetailColumns} dataSource={detail} />
        </div>
    );
});
