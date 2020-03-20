import { Setting } from 'src/core/api';

export function convertArrayOfObjectsToObject(data?: Setting[]) {
    return data && Object.assign({}, ...data.map((item) => ({ [item.type]: item.value })));
}
