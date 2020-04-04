export interface UoM {
    description: string;
    id?: string;
    name: string;
    status: string;
}

export interface UoMData extends UoM {
    key: string;
}
