export interface Category {
    description: string;
    id?: string;
    name: string;
    status: string;
}

export interface CategoryData extends Category {
    key: string;
}
