import { PageLoading } from 'src/app/shell/PageLoading';

import { suspend } from 'src/core/chunk';

export const HomePage = suspend({
    component: () => import(/* webpackChunkName: "HomePage" */ './index'),
    renderWhileLoading: PageLoading,
});
