import * as React from 'react';

import { Lang } from 'src/core/api';

import { CrudListTable } from 'src/shared/components/Crud/CrudList/CrudListTable';
import { handleSalesReturnDetail } from 'src/shared/components/Sales/helpers';

import { salesReturnDetailColumns } from '../constants';

export interface SalesReturnDetailProps extends Lang {
    data: any;
}

export const SalesReturnDetail = React.memo<SalesReturnDetailProps>(({ data, ...props }) => {
    let detail = handleSalesReturnDetail(data);

    return (
        <div className='col-12'>
            <CrudListTable {...props} columns={salesReturnDetailColumns} dataSource={detail} />
        </div>
    );
});
