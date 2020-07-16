import { PageLoading } from 'src/app/shell/PageLoading';

import { suspend } from 'src/core/chunk';

export const MedicineAlmostDepletedReportPage = suspend({
    component: () => import(/* webpackChunkName: "MedicineAlmostDepletedReportPage" */ './index'),
    renderWhileLoading: PageLoading,
});
