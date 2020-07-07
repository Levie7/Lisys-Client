import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';

import { Module } from './core';
import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';

export const createClient = ({ serverUri, modules }: { serverUri: string; modules: Module[] }) => {
    const fragmentMatcher = new IntrospectionFragmentMatcher({
        introspectionQueryResultData: {
            __schema: {
                types: [],
            },
        },
    });
    const cache = new InMemoryCache({ fragmentMatcher });
    modules.forEach((module) => module.onInitCache && module.onInitCache(cache));

    const httpLink = new HttpLink({ uri: serverUri });
    const moduleLink = modules.reduce<ApolloLink | undefined>((link, module) => {
        if (module.onInitLink) return module.onInitLink(link);
        return link;
    }, undefined);
    const link = moduleLink ? moduleLink.concat(httpLink) : httpLink;

    return new ApolloClient({
        link,
        cache,
        resolvers,
        typeDefs,
    });
};

export { ApolloProvider as GraphqlProvider };
