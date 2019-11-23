import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';

export const createClient = ({ serverUri, links }: { serverUri: string; links: ApolloLink[] }) => {
    const httpLink = new HttpLink({ uri: serverUri });
    const withHttplinks = [...links, httpLink];

    return new ApolloClient({
        link: withHttplinks.reduce((link, nextLink) => {
            return link ? link.concat(nextLink) : nextLink;
        }),
        cache: new InMemoryCache(),
    });
};

export { ApolloProvider as GraphqlProvider };
