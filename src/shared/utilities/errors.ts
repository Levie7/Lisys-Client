import { ApolloError } from 'apollo-client';

import { Message } from './message';

export function Errors(error: ApolloError) {
    if (error.graphQLErrors)
        error.graphQLErrors.map(({ message, locations, path }) =>
            Message(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
                'error'
            )
        );

    if (error.networkError) Message(`[Network error]: ${error.networkError}`, 'error');

    return null;
}
