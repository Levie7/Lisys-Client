import { PageLoading } from 'src/app/shell/PageLoading';

import { suspend } from 'src/core/chunk';

export const MasterVariantPage = suspend({
    component: () => import(/* webpackChunkName: "MasterVariantPage" */ './index'),
    renderWhileLoading: PageLoading,
});
