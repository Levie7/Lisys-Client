import { Column, Setting } from 'src/core/api';

import { Capitalized } from 'src/shared/utilities/capitalized';

export function convertArrayOfObjectsToObject(data?: Setting[]) {
    return data && Object.assign({}, ...data.map((item) => ({ [item.type]: item.value })));
}

export function convertDataFieldToColumn(data: any) {
    let columns: Column[] = [];

    convertDataFieldToArray(data).map((value: string) =>
        columns.push({ title: Capitalized(value), dataIndex: value, key: value } as Column)
    );

    return columns;
}

export function convertDataFieldToArray(data: any) {
    let fields = Object.keys(data);
    fields.splice(fields.indexOf('id'), 1);
    fields.splice(fields.indexOf('__typename'), 1);

    return fields;
}
