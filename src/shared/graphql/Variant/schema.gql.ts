import { Variant } from 'src/core/api';
import { gql, useMutation, useQuery } from 'src/core/graphql';

export const VARIANTS = gql`
    query {
        getVariants {
            id
            name
            description
            status
        }
    }
`;

export const VARIANT_BY_ID = gql`
    query getVariantById($id: ID!) {
        getVariantById(id: $id) {
            name
            description
        }
    }
`;

const CREATE_VARIANT = gql`
    mutation createVariant($payload: CreateVariantPayload) {
        createVariant(payload: $payload) {
            name
        }
    }
`;

const DELETE_VARIANT = gql`
    mutation deleteVariant($payload: DeleteVariantPayload) {
        deleteVariant(payload: $payload) {
            name
        }
    }
`;

const UPDATE_MANY_VARIANT = gql`
    mutation updateManyVariant($payload: UpdateManyVariantPayload) {
        updateManyVariant(payload: $payload) {
            status
        }
    }
`;

const UPDATE_VARIANT = gql`
    mutation updateVariant($payload: UpdateVariantPayload) {
        updateVariant(payload: $payload) {
            name
        }
    }
`;

export const getVariantById = (options: any) =>
    useQuery<{ getVariantById: Variant }>(VARIANT_BY_ID, options);
export const getVariants = (options: any) =>
    useQuery<{ getVariants: Variant[] }>(VARIANTS, options);
export const createVariant = (options: any) =>
    useMutation<{ createVariant: Variant }>(CREATE_VARIANT, options);
export const deleteVariant = (options: any) =>
    useMutation<{ deleteVariant: Variant }>(DELETE_VARIANT, options);
export const updateManyVariant = (options: any) =>
    useMutation<{ updateManyVariant: Variant }>(UPDATE_MANY_VARIANT, options);
export const updateVariant = (options: any) =>
    useMutation<{ updateVariant: Variant }>(UPDATE_VARIANT, options);
