import { PageLoading } from 'src/app/shell/PageLoading';

import { suspend } from 'src/core/chunk';

export const SalesReturnPage = suspend({
    component: () => import(/* webpackChunkName: "SalesReturnPage" */ './index'),
    renderWhileLoading: PageLoading,
});
