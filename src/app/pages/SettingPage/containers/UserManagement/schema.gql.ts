import { gql, useQuery } from 'src/core/graphql';

export const USER_MANAGEMENT = gql`
    query {
        getTotalActiveRoles
        getTotalActiveUsers
    }
`;

export const getTotalActive = (options: any) =>
    useQuery<{ getTotalActiveRoles: number; getTotalActiveUsers: number }>(
        USER_MANAGEMENT,
        options
    );
