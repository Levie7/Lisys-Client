import { PageLoading } from 'src/app/shell/PageLoading';

import { suspend } from 'src/core/chunk';

export const PurchaseListPage = suspend({
    component: () => import(/* webpackChunkName: "PurchaseListPage" */ './index'),
    renderWhileLoading: PageLoading,
});
