import { PageLoading } from 'src/app/shell/PageLoading';

import { suspend } from 'src/core/chunk';

export const SettingPage = suspend({
    component: () => import(/* webpackChunkName: "SettingPage" */ './index'),
    renderWhileLoading: PageLoading,
});
