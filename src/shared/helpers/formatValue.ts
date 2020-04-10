export function formatValue(value: number | string) {
    value = value.toString().replace('.', '');
    value = formatPointValue(value);

    return parseFloat(value);
}

export function formatCommaValue(value: number | string) {
    return value.toString().replace('.', ',');
}

export function formatPointValue(value: number | string) {
    return value.toString().replace(',', '.');
}
