export interface Variant {
    description: string;
    id?: string;
    name: string;
    status: string;
}

export interface VariantData extends Variant {
    key: string;
}
