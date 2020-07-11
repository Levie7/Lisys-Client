export interface Permission {
    action?: { id: string; name: string };
    id?: string;
    menu?: { id: string; name: string };
    status: string;
}
