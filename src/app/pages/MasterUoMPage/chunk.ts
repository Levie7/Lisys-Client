import { PageLoading } from 'src/app/shell/PageLoading';

import { suspend } from 'src/core/chunk';

export const MasterUoMPage = suspend({
    component: () => import(/* webpackChunkName: "MasterUoMPage" */ './index'),
    renderWhileLoading: PageLoading,
});
