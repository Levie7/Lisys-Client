import { PageLoading } from 'src/app/shell/PageLoading';

import { suspend } from 'src/core/chunk';

export const PurchasePaymentPage = suspend({
    component: () => import(/* webpackChunkName: "PurchasePaymentPage" */ './index'),
    renderWhileLoading: PageLoading,
});
