import { Action } from 'src/core/api';

export function initialize({
    fetch,
    initSection,
    isInit,
}: {
    fetch: any;
    initSection: string;
    isInit: boolean;
}) {
    if (!isInit) {
        fetch({
            variables: { payload: { action: 'list', section: initSection } },
        });
        return !isInit;
    }
    return isInit;
}
