import { setContext } from 'apollo-link-context';

import { graphqlClient } from 'src/app';

import { createInMemoryStorage } from 'src/core/storage';

import { gql, Module, useQuery, useMutation } from './core';

const TOKEN_STORAGE_KEY = 'auth';

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
        deleteToken: storage.delete,
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
            isSessionAuthenticated @client
        }
    `);

export const UPDATE_AUTH = gql`
    mutation updateAuth($payload: UpdateAuthPayload) {
        updateAuth(payload: $payload) @client
    }
`;

export const updateAuth = () =>
    useMutation<{ updateAuth: string }>(UPDATE_AUTH, {
        update(cache, { data }) {
            let token = data?.updateAuth;
            if (token) {
                createAuthTokenStorage().setToken(token);
            }
        },
    });

export const useIsAuthenticated = () => {
    let { loading, error, data } = useSession();
    if (loading || error) return false;
    return data?.isSessionAuthenticated || false;
};

export const exitSession = () => {
    createAuthTokenStorage().deleteToken();
    localStorage.removeItem('greeting');
    graphqlClient.cache.writeData(createAuthData(false));
};
