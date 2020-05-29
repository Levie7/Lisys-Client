import { Medicine, MedicineData } from 'src/core/api';

import { Currency } from 'src/shared/helpers/formatCurrency';
import { formatCommaValue } from 'src/shared/helpers/formatValue';

export function initialize({
    action = 'list',
    fetch,
    initSection,
    isInit,
}: {
    action?: string;
    fetch: any;
    initSection: string;
    isInit: boolean;
}) {
    if (!isInit) {
        fetch({
            variables: { payload: { action, section: initSection } },
        });
        return !isInit;
    }
    return isInit;
}

export function handleMedicineData(data?: any): { list: MedicineData[]; total: number } {
    let medicine = data?.getMedicineList.data;
    let total = data?.getMedicineList.total;
    if (!medicine || !medicine.length) {
        return { list: [], total: 0 };
    }

    return {
        list: medicine.map((medicine: Medicine) => {
            return {
                barcode: medicine.barcode,
                buy_price: Currency(formatCommaValue(medicine.buy_price)),
                category_name: medicine.category!.name,
                code: medicine.code,
                key: medicine.id!,
                min_stock: medicine.min_stock,
                name: medicine.name,
                sell_price: Currency(formatCommaValue(medicine.sell_price)),
                status: medicine.status,
                stock: medicine.stock,
                uom_name: medicine.uom!.name,
                variant_name: medicine.variant!.name,
            };
        }),
        total,
    };
}
