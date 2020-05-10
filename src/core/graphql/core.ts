import { ApolloCache } from 'apollo-cache';
import { ApolloLink } from 'apollo-link';

export { useMutation, useQuery, useApolloClient as useClient } from '@apollo/react-hooks';
export { default as gql } from 'graphql-tag';

export interface Module<T = any> {
    onInitCache?: (cache: ApolloCache<T>) => void;
    onInitLink?: (link: ApolloLink | undefined) => ApolloLink;
}
