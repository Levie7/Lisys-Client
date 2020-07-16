import { PageLoading } from 'src/app/shell/PageLoading';

import { suspend } from 'src/core/chunk';

export const MedicineAlmostExpiredReportPage = suspend({
    component: () => import(/* webpackChunkName: "MedicineAlmostExpiredReportPage" */ './index'),
    renderWhileLoading: PageLoading,
});
