import { PageLoading } from 'src/app/shell/PageLoading';

import { suspend } from 'src/core/chunk';

export const StockOpnamePage = suspend({
    component: () => import(/* webpackChunkName: "StockOpnamePage" */ './index'),
    renderWhileLoading: PageLoading,
});
