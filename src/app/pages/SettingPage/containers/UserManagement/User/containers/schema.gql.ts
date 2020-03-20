import { User } from 'src/core/api';
import { gql, useMutation, useQuery } from 'src/core/graphql';

export const USERS = gql`
    query {
        getUsers {
            id
            name
            role {
                name
            }
            username
        }
    }
`;

export const USER_BY_ID = gql`
    query getUserById($id: ID!) {
        getUserById(id: $id) {
            name
            role {
                id
            }
            username
        }
    }
`;

const CHECK_USERNAME = gql`
    query checkUsername($username: String) {
        checkUsername(username: $username)
    }
`;

const CREATE_USER = gql`
    mutation createUser($payload: CreateUserPayload) {
        createUser(payload: $payload) {
            name
            password
            role {
                id
            }
            username
        }
    }
`;

const DELETE_USER = gql`
    mutation deleteUser($payload: DeleteUserPayload) {
        deleteUser(payload: $payload) {
            name
            password
            username
        }
    }
`;

const UPDATE_USER = gql`
    mutation updateUser($payload: UpdateUserPayload) {
        updateUser(payload: $payload) {
            name
            password
            role {
                id
            }
            username
        }
    }
`;

export const checkUsername = (options: any) =>
    useQuery<{ checkUsername: Boolean }>(CHECK_USERNAME, options);
export const getUserById = (options: any) => useQuery<{ getUserById: User }>(USER_BY_ID, options);
export const getUsers = (options: any) => useQuery<{ getUsers: User[] }>(USERS, options);
export const createUser = (options: any) => useMutation<{ createUser: User }>(CREATE_USER, options);
export const deleteUser = (options: any) => useMutation<{ deleteUser: User }>(DELETE_USER, options);
export const updateUser = (options: any) => useMutation<{ updateUser: User }>(UPDATE_USER, options);
