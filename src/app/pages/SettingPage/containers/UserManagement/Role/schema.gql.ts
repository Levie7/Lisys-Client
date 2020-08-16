import { Role } from 'src/core/api';
import { gql, useMutation, useQuery } from 'src/core/graphql';

export const ROLE_BY_ID = gql`
    query getRoleById($id: ID!) {
        getRoleById(id: $id) {
            name
            description
        }
    }
`;

export const ROLE_LIST = gql`
    query getRoleList($payload: ListPayload) {
        getRoleList(payload: $payload) {
            data {
                id
                name
                description
            }
            total
        }
    }
`;

export const ROLES = gql`
    query {
        getRoles {
            id
            name
            description
        }
    }
`;

const CREATE_ROLE = gql`
    mutation createRole($payload: CreateRolePayload) {
        createRole(payload: $payload) {
            name
            description
        }
    }
`;

const DELETE_ROLE = gql`
    mutation deleteRole($payload: DeletePayload) {
        deleteRole(payload: $payload) {
            description
        }
    }
`;

const UPDATE_ROLE = gql`
    mutation updateRole($payload: UpdateRolePayload) {
        updateRole(payload: $payload) {
            name
            description
        }
    }
`;

export const getRoleById = (options: any) => useQuery<{ getRoleById: Role }>(ROLE_BY_ID, options);
export const getRoleList = (options: any) => useQuery<{ getRoleList: Role[] }>(ROLE_LIST, options);
export const getRoles = (options: any) => useQuery<{ getRoles: Role[] }>(ROLES, options);
export const createRole = (options: any) => useMutation<{ createRole: Role }>(CREATE_ROLE, options);
export const deleteRole = (options: any) => useMutation<{ deleteRole: Role }>(DELETE_ROLE, options);
export const updateRole = (options: any) => useMutation<{ updateRole: Role }>(UPDATE_ROLE, options);
