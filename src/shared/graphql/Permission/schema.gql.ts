import { Permission } from 'src/core/api';
import { gql, useMutation, useQuery } from 'src/core/graphql';

export const GET_ACCESS_PERMISSIONS = gql`
    query getAccessPermissionByRoleId($role_id: String!) {
        getAccessPermissionByRoleId(role_id: $role_id) {
            action {
                name
            }
            id
            menu {
                name
            }
            status
        }
    }
`;

export const GET_CREATE_PERMISSIONS = gql`
    query getCreatePermissionByRoleId($role_id: String!) {
        getCreatePermissionByRoleId(role_id: $role_id) {
            action {
                name
            }
            id
            menu {
                name
            }
            status
        }
    }
`;

export const GET_DELETE_PERMISSIONS = gql`
    query getDeletePermissionByRoleId($role_id: String!) {
        getDeletePermissionByRoleId(role_id: $role_id) {
            action {
                name
            }
            id
            menu {
                name
            }
            status
        }
    }
`;

export const GET_READ_PERMISSIONS = gql`
    query getReadPermissionByRoleId($role_id: String!) {
        getReadPermissionByRoleId(role_id: $role_id) {
            action {
                name
            }
            id
            menu {
                name
            }
            status
        }
    }
`;

export const GET_UPDATE_PERMISSIONS = gql`
    query getUpdatePermissionByRoleId($role_id: String!) {
        getUpdatePermissionByRoleId(role_id: $role_id) {
            action {
                name
            }
            id
            menu {
                name
            }
            status
        }
    }
`;

export const ACTIONS = gql`
    query {
        getActions {
            id
            name
        }
    }
`;

export const PERMISSIONS = gql`
    query getPermissionsByRoleId($role_id: String!) {
        getPermissionsByRoleId(role_id: $role_id) {
            action {
                name
            }
            id
            menu {
                key
                name
            }
            status
        }
    }
`;

const UPDATE_PERMISSION = gql`
    mutation updatePermission($payload: UpdatePermissionPayload) {
        updatePermission(payload: $payload) {
            status
        }
    }
`;

export const getActions = (options: any) =>
    useQuery<{ getActions: { id: string; name: string } }>(ACTIONS, options);
export const getAccessPermissionByRoleId = (options: any) =>
    useQuery<{ getAccessPermissionByRoleId: Permission }>(GET_ACCESS_PERMISSIONS, options);
export const getCreatePermissionByRoleId = (options: any) =>
    useQuery<{ getCreatePermissionByRoleId: Permission }>(GET_CREATE_PERMISSIONS, options);
export const getDeletePermissionByRoleId = (options: any) =>
    useQuery<{ getDeletePermissionByRoleId: Permission }>(GET_DELETE_PERMISSIONS, options);
export const getReadPermissionByRoleId = (options: any) =>
    useQuery<{ getReadPermissionByRoleId: Permission }>(GET_READ_PERMISSIONS, options);
export const getUpdatePermissionByRoleId = (options: any) =>
    useQuery<{ getUpdatePermissionByRoleId: Permission }>(GET_UPDATE_PERMISSIONS, options);
export const getPermissionsByRoleId = (options: any) =>
    useQuery<{ getPermissionsByRoleId: Permission }>(PERMISSIONS, options);
export const updatePermission = (options: any) =>
    useMutation<{ updatePermission: Permission }>(UPDATE_PERMISSION, options);
