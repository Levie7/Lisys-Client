import { PageLoading } from 'src/app/shell/PageLoading';

import { suspend } from 'src/core/chunk';

export const MasterMedicinePage = suspend({
    component: () => import(/* webpackChunkName: "MasterMedicinePage" */ './index'),
    renderWhileLoading: PageLoading,
});
