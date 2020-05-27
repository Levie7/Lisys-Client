import { PageLoading } from 'src/app/shell/PageLoading';

import { suspend } from 'src/core/chunk';

export const BuyPriceHistoryPage = suspend({
    component: () => import(/* webpackChunkName: "BuyPriceHistoryPage" */ './index'),
    renderWhileLoading: PageLoading,
});
