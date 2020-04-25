export function initialize(init: boolean, fetch: any, section: string) {
    if (!init) {
        fetch({
            variables: { payload: { action: 'back', section } },
        });
        return !init;
    }
    return init;
}
