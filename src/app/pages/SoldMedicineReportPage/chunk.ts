import { PageLoading } from 'src/app/shell/PageLoading';

import { suspend } from 'src/core/chunk';

export const SoldMedicineReportPage = suspend({
    component: () => import(/* webpackChunkName: "SoldMedicineReportPage" */ './index'),
    renderWhileLoading: PageLoading,
});
