import * as React from 'react';

import { CrudListTable } from 'src/shared/components/Crud/CrudList/CrudListTable';
import { handlePurchaseListDetail } from 'src/shared/components/Purchasing/helpers';

import { purchaseDetailColumns } from '../constants';

interface PurchaseDetailProps {
    data: any;
}

export const PurchaseDetail = React.memo<PurchaseDetailProps>(({ data }) => {
    let detail = handlePurchaseListDetail(data);

    return (
        <div className='col-12'>
            <CrudListTable columns={purchaseDetailColumns} dataSource={detail} />
        </div>
    );
});
