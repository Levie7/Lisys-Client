import { Action } from '../../api/interfaces/commons/action';

export interface Crud {
    action: Action;
    section: string;
    __typename?: string;
}
