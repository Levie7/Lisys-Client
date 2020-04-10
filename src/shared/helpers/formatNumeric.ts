function Numeric(value: string) {
    return value.replace(/[^-\d]/g, '').toString();
}

export function formatNumeric(e: any) {
    return Numeric(e.currentTarget.value);
}
