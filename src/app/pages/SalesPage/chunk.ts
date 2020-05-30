import { PageLoading } from 'src/app/shell/PageLoading';

import { suspend } from 'src/core/chunk';

export const SalesPage = suspend({
    component: () => import(/* webpackChunkName: "SalesPage" */ './index'),
    renderWhileLoading: PageLoading,
});
