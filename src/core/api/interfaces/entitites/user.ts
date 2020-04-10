export interface User {
    id?: string;
    name: string;
    password?: string;
    role?: { name: string };
    username: string;
}

export interface UserData extends User {
    key: string;
    role_name: string;
}
