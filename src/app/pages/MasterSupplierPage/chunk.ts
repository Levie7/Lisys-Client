import { PageLoading } from 'src/app/shell/PageLoading';

import { suspend } from 'src/core/chunk';

export const MasterSupplierPage = suspend({
    component: () => import(/* webpackChunkName: "MasterSupplierPage" */ './index'),
    renderWhileLoading: PageLoading,
});
