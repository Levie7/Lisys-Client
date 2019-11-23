import { setContext } from 'apollo-link-context';

import { createInMemoryStorage } from 'src/core/storage';

const TOKEN_STORAGE_KEY = 'token';

export const createAuthLink = ({ storage }: { storage: { getToken: () => string | null } }) =>
    setContext((_, { headers, ...prevContext }: { headers: { [key: string]: string } }) => {
        const token = storage.getToken();
        return {
            ...prevContext,
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : '',
            },
        };
    });

export const createAuthTokenStorage = () => {
    const storage = createInMemoryStorage<string>(TOKEN_STORAGE_KEY);
    return {
        getToken: storage.get,
        setToken: storage.set,
    };
};

export const useAuth = () => {
    const storage = createAuthTokenStorage();
    return { isAuth: !!storage.getToken(), setToken: (token: string) => storage.setToken(token) };
};
