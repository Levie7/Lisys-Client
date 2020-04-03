import { PageLoading } from 'src/app/shell/PageLoading';

import { suspend } from 'src/core/chunk';

export const MasterCategoryPage = suspend({
    component: () => import(/* webpackChunkName: "MasterCategoryPage" */ './index'),
    renderWhileLoading: PageLoading,
});
