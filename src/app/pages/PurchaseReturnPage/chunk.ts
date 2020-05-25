import { PageLoading } from 'src/app/shell/PageLoading';

import { suspend } from 'src/core/chunk';

export const PurchaseReturnPage = suspend({
    component: () => import(/* webpackChunkName: "PurchaseReturnPage" */ './index'),
    renderWhileLoading: PageLoading,
});
