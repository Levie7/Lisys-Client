export function Percentage(value: string) {
    let split = value.split(',');

    return split[1] !== undefined ? split[0] + ',' + split[1].slice(0, 2) : value;
}

export function formatPercentage(e: any) {
    return Percentage(e.currentTarget.value.replace(/[^,\d]/g, '').toString());
}
