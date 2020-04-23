export function initialize(init: boolean, fetch: any, section: string) {
    if (!init) {
        fetch({
            variables: { payload: { action: 'list', section } },
        });
        return !init;
    }
    return init;
}
