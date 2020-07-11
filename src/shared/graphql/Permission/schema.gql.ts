import { Permission } from 'src/core/api';
import { gql, useMutation, useQuery } from 'src/core/graphql';

export const ACCESS_PERMISSIONS = gql`
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
    useQuery<{ getAccessPermissionByRoleId: Permission }>(ACCESS_PERMISSIONS, options);
export const getPermissionsByRoleId = (options: any) =>
    useQuery<{ getPermissionsByRoleId: Permission }>(PERMISSIONS, options);
export const updatePermission = (options: any) =>
    useMutation<{ updatePermission: Permission }>(UPDATE_PERMISSION, options);
