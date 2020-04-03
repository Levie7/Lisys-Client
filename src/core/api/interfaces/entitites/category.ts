export interface Category {
    id?: string;
    name: string;
    description: string;
    status: string;
}

export interface CategoryData extends Category {
    key: string;
}
