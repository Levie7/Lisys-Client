import { PageLoading } from 'src/app/shell/PageLoading';

import { suspend } from 'src/core/chunk';

export const StockCardPage = suspend({
    component: () => import(/* webpackChunkName: "StockCardPage" */ './index'),
    renderWhileLoading: PageLoading,
});
