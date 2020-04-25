export function formatValue(value: number | string) {
    value = value.toString().replace(/\./g, '');
    value = formatPointValue(value);

    return parseFloat(value);
}

export function formatCommaValue(value: number | string) {
    return value.toString().replace(/\./g, ',');
}

export function formatPointValue(value: number | string) {
    return value.toString().replace(/,/g, '.');
}
