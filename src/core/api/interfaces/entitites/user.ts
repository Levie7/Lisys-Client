export interface User {
    id?: string;
    name: string;
    username: string;
    password?: string;
    role?: {
        name: string;
    };
}

export interface UserData extends User {
    key: string;
    roleName: string;
}
