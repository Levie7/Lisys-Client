import gql from 'graphql-tag';

export const typeDefs = gql`
    type Query {
        getCrud: Crud
        isSessionAuthenticated: Boolean!
    }

    type Mutation {
        updateAuth(payload: UpdateAuthPayload): String
        updateCrud(payload: UpdateCrudPayload): Crud
    }

    input UpdateCrudPayload {
        action: String!
        section: String!
    }

    input UpdateAuthPayload {
        isSessionAuthenticated: Boolean
        username: String
    }

    type Crud {
        action: String
        section: String
    }
`;
