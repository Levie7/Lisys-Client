import * as React from 'react';

import { CrudListTable } from 'src/shared/components/Crud/CrudList/CrudListTable';
import { handlePurchasePaymentDetail } from 'src/shared/components/Purchasing/helpers';

import { purchasePaymentDetailColumns } from '../constants';

interface PurchasePaymentDetailProps {
    data: any;
}

export const PurchasePaymentDetail = React.memo<PurchasePaymentDetailProps>(({ data }) => {
    let detail = handlePurchasePaymentDetail(data);

    return (
        <div className='col-12'>
            <CrudListTable columns={purchasePaymentDetailColumns} dataSource={detail} />
        </div>
    );
});
