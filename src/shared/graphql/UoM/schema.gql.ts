import { UoM } from 'src/core/api';
import { gql, useMutation, useQuery } from 'src/core/graphql';

export const UOMS = gql`
    query {
        getUoMs {
            id
            name
            description
            status
        }
    }
`;

export const UOM_BY_ID = gql`
    query getUoMById($id: ID!) {
        getUoMById(id: $id) {
            name
            description
        }
    }
`;

const CREATE_UOM = gql`
    mutation createUoM($payload: CreateUoMPayload) {
        createUoM(payload: $payload) {
            name
        }
    }
`;

const DELETE_UOM = gql`
    mutation deleteUoM($payload: DeleteUoMPayload) {
        deleteUoM(payload: $payload) {
            name
        }
    }
`;

const UPDATE_MANY_UOM = gql`
    mutation updateManyUoM($payload: UpdateManyUoMPayload) {
        updateManyUoM(payload: $payload) {
            status
        }
    }
`;

const UPDATE_UOM = gql`
    mutation updateUoM($payload: UpdateUoMPayload) {
        updateUoM(payload: $payload) {
            name
        }
    }
`;

export const getUoMById = (options: any) => useQuery<{ getUoMById: UoM }>(UOM_BY_ID, options);
export const getUoMs = (options: any) => useQuery<{ getUoMs: UoM[] }>(UOMS, options);
export const createUoM = (options: any) => useMutation<{ createUoM: UoM }>(CREATE_UOM, options);
export const deleteUoM = (options: any) => useMutation<{ deleteUoM: UoM }>(DELETE_UOM, options);
export const updateManyUoM = (options: any) =>
    useMutation<{ updateManyUoM: UoM }>(UPDATE_MANY_UOM, options);
export const updateUoM = (options: any) => useMutation<{ updateUoM: UoM }>(UPDATE_UOM, options);
