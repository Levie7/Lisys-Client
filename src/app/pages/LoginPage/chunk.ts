import { PageLoading } from 'src/app/shell/PageLoading';

import { suspend } from 'src/core/chunk';

export const LoginPage = suspend({
    component: () => import(/* webpackChunkName: "LoginPage" */ './index'),
    renderWhileLoading: PageLoading,
});
