import * as React from 'react';

import { Lang } from 'src/core/api';

import { CrudListTable } from 'src/shared/components/Crud/CrudList/CrudListTable';
import { handlePurchasePaymentDetail } from 'src/shared/components/Purchasing/helpers';

import { purchasePaymentDetailColumns } from '../constants';

export interface PurchasePaymentDetailProps extends Lang {
    data: any;
}

export const PurchasePaymentDetail = React.memo<PurchasePaymentDetailProps>(
    ({ data, ...props }) => {
        let detail = handlePurchasePaymentDetail(data);

        return (
            <div className='col-12'>
                <CrudListTable
                    {...props}
                    columns={purchasePaymentDetailColumns}
                    dataSource={detail}
                />
            </div>
        );
    }
);
