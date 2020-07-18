import * as React from 'react';

import { CrudListTable } from 'src/shared/components/Crud/CrudList/CrudListTable';
import { handlePurchaseReturnDetail } from 'src/shared/components/Purchasing/helpers';

import { purchaseReturnDetailColumns } from '../constants';

interface PurchaseReturnDetailProps {
    data: any;
}

export const PurchaseReturnDetail = React.memo<PurchaseReturnDetailProps>(({ data }) => {
    let detail = handlePurchaseReturnDetail(data);

    return (
        <div className='col-12'>
            <CrudListTable columns={purchaseReturnDetailColumns} dataSource={detail} />
        </div>
    );
});
