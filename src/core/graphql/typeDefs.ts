import gql from 'graphql-tag';

export const typeDefs = gql`
    type Query {
        getCrud: Crud
        isSessionAuthenticated: Boolean!
    }

    type Mutation {
        updateCrud(payload: UpdateCrudPayload): Crud
    }

    input UpdateCrudPayload {
        action: String!
        section: String!
    }

    type Crud {
        action: String
        section: String
    }
`;
