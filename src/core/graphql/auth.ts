import { setContext } from 'apollo-link-context';

import { createInMemoryStorage } from 'src/core/storage';

import { gql, Module, useQuery } from './core';

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

export const createAuthData = (isSessionAuthenticated: boolean) => ({
    data: {
        isSessionAuthenticated,
    },
});

export const createAuthModule: (dependencies: {
    storage: { getToken: () => string | null };
}) => Module = ({ storage }) => {
    const authLink = createAuthLink({ storage });
    return {
        onInitCache: (cache) => cache.writeData(createAuthData(!!storage.getToken())),
        onInitLink: (link) => (link ? link.concat(authLink) : authLink),
    };
};

export const useSession = () =>
    useQuery<{ isSessionAuthenticated: boolean }>(gql`
        query IsSessionAuthenticated {
            isSessionAuthenticated @client(always: true)
        }
    `);

export const useIsAuthenticated = () => {
    let { loading, error, data } = useSession();
    if (loading || error) return false;
    return data?.isSessionAuthenticated || false;
};
