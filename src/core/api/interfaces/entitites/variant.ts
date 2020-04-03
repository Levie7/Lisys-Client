export interface Variant {
    id?: string;
    name: string;
    description: string;
    status: string;
}

export interface VariantData extends Variant {
    key: string;
}
