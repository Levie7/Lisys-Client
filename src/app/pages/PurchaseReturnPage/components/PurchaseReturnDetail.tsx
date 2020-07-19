import * as React from 'react';

import { Lang } from 'src/core/api';

import { CrudListTable } from 'src/shared/components/Crud/CrudList/CrudListTable';
import { handlePurchaseReturnDetail } from 'src/shared/components/Purchasing/helpers';

import { purchaseReturnDetailColumns } from '../constants';

export interface PurchaseReturnDetailProps extends Lang {
    data: any;
}

export const PurchaseReturnDetail = React.memo<PurchaseReturnDetailProps>(({ data, ...props }) => {
    let detail = handlePurchaseReturnDetail(data);

    return (
        <div className='col-12'>
            <CrudListTable {...props} columns={purchaseReturnDetailColumns} dataSource={detail} />
        </div>
    );
});
