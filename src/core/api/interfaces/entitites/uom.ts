export interface UoM {
    id?: string;
    name: string;
    description: string;
    status: string;
}

export interface UoMData extends UoM {
    key: string;
}
