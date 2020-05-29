import { PageLoading } from 'src/app/shell/PageLoading';

import { suspend } from 'src/core/chunk';

export const SalesListPage = suspend({
    component: () => import(/* webpackChunkName: "SalesListPage" */ './index'),
    renderWhileLoading: PageLoading,
});
