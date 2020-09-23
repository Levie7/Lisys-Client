import * as React from 'react';

import { Lang } from 'src/core/api';

import { CrudListTable } from 'src/shared/components/Crud/CrudList/CrudListTable';
import { handlePurchaseReturnDetail } from 'src/shared/components/Purchasing/helpers';

import { salesReturnDetailColumns } from '../constants';

export interface SalesReturnDetailProps extends Lang {
    data: any;
}

export const SalesReturnDetail = React.memo<SalesReturnDetailProps>(({ data, ...props }) => {
    let detail = handlePurchaseReturnDetail(data);

    return (
        <div className='col-12'>
            <CrudListTable {...props} columns={salesReturnDetailColumns} dataSource={detail} />
        </div>
    );
});
