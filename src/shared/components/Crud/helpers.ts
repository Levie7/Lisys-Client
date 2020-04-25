import { Action } from 'src/core/api';

export function handleFetchCrud({ action, fetch, ...crud }: { action: Action; fetch: any }) {
    fetch({
        variables: { payload: { ...crud, action } },
    });
}
