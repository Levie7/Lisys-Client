import { PageLoading } from 'src/app/shell/PageLoading';

import { suspend } from 'src/core/chunk';

export const SummarySalesReportPage = suspend({
    component: () => import(/* webpackChunkName: "SummarySalesReportPage" */ './index'),
    renderWhileLoading: PageLoading,
});
