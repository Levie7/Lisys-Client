export function Currency(value: string) {
    let isMinus = false;
    if (value.includes('-')) {
        let minus = value.split('-');
        value = minus[1];
        isMinus = true;
    }
    let split = value.split(',');
    let remainValue = split[0].length % 3;
    let result = split[0].substr(0, remainValue);
    let thousands = split[0].substr(remainValue).match(/\d{1,3}/gi);
    if (thousands) {
        let separator = remainValue ? '.' : '';
        result += separator + thousands.join('.');
    }

    result = isMinus ? '-' + result : result;

    return split[1] !== undefined ? result + ',' + split[1].slice(0, 2) : result;
}

export function formatCurrency(e: any) {
    return Currency(e.currentTarget.value.replace(/[^,\d]/g, '').toString());
}
