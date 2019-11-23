export const createInMemoryStorage = <T>(name: string) => {
    const formatter = (value: T) => JSON.stringify({ value });
    const parser = (value: string | null) => (value ? (JSON.parse(value).value as T) : null);
    return {
        get: () => parser(localStorage.getItem(name)),
        set: (value: T) => localStorage.setItem(name, formatter(value)),
    };
};
