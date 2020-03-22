import { ApolloError } from 'apollo-client';

import { Message } from './message';

export function ErrorHandler(error?: ApolloError) {
    if (error!.graphQLErrors)
        error!.graphQLErrors.map(({ extensions, message, path }) => {
            let messages = `[GraphQL error]: Message: ${message}, Path: ${path}`;
            if (extensions && extensions.code === 'BAD_USER_INPUT') {
                messages = `[Validation Error]: Message: ${message}, Path: ${path}`;
            }
            Message(messages, 'error');
        });

    if (error!.networkError) Message(`[Network error]: ${error!.networkError}`, 'error');

    return null;
}
