import { PageLoading } from 'src/app/shell/PageLoading';

import { suspend } from 'src/core/chunk';

export const MedicineListReportPage = suspend({
    component: () => import(/* webpackChunkName: "MedicineListReportPage" */ './index'),
    renderWhileLoading: PageLoading,
});
