export const createInMemoryStorage = <T>(name: string) => {
    const parser = (value: string | null) => (value ? (JSON.parse(value).value as T) : null);
    const formatter = (value: T) => JSON.stringify({ value });
    return {
        get: () => parser(localStorage.getItem(name)),
        set: (value: T) => localStorage.setItem(name, formatter(value)),
        delete: () => localStorage.removeItem(name),
    };
};
