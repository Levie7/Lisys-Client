import { Action } from './action';

interface SectionDefault {
    action: Action;
}

export interface Section extends SectionDefault {
    section: string;
}

export interface SectionHeader extends SectionDefault {
    section?: string;
}
