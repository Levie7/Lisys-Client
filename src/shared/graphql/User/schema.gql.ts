import { User } from 'src/core/api';
import { gql, useMutation, useQuery } from 'src/core/graphql';

const AUTH_LOGIN = gql`
    query authLogin($payload: AuthLogin) {
        authLogin(payload: $payload)
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

export const USER_BY_USERNAME = gql`
    query getUserByUsername($username: String) {
        getUserByUsername(username: $username) {
            name
            role {
                id
            }
            username
        }
    }
`;

export const USER_LIST = gql`
    query getUserList($payload: ListPayload) {
        getUserList(payload: $payload) {
            data {
                id
                name
                role {
                    name
                }
                username
            }
            total
        }
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

export const authLogin = (options: any) => useQuery<{ authLogin: Boolean }>(AUTH_LOGIN, options);
export const getUserById = (options: any) => useQuery<{ getUserById: User }>(USER_BY_ID, options);
export const getUserByUsername = (options: any) =>
    useQuery<{ getUserByUsername: User }>(USER_BY_USERNAME, options);
export const getUserList = (options: any) => useQuery<{ getUserList: User[] }>(USER_LIST, options);
export const createUser = (options: any) => useMutation<{ createUser: User }>(CREATE_USER, options);
export const deleteUser = (options: any) => useMutation<{ deleteUser: User }>(DELETE_USER, options);
export const updateUser = (options: any) => useMutation<{ updateUser: User }>(UPDATE_USER, options);
