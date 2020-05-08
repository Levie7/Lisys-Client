import { Category } from 'src/core/api';
import { gql, useMutation, useQuery } from 'src/core/graphql';

export const CATEGORIES = gql`
    query {
        getCategories {
            id
            name
            description
            status
        }
    }
`;

export const CATEGORY_BY_ID = gql`
    query getCategoryById($id: ID!) {
        getCategoryById(id: $id) {
            name
            description
        }
    }
`;

export const CATEGORY_LIST = gql`
    query getCategoryList($payload: ListPayload) {
        getCategoryList(payload: $payload) {
            data {
                id
                name
                description
                status
            }
            total
        }
    }
`;

const CREATE_CATEGORY = gql`
    mutation createCategory($payload: CreateCategoryPayload) {
        createCategory(payload: $payload) {
            name
        }
    }
`;

const DELETE_CATEGORY = gql`
    mutation deleteCategory($payload: DeleteCategoryPayload) {
        deleteCategory(payload: $payload) {
            name
        }
    }
`;

const UPDATE_MANY_CATEGORY = gql`
    mutation updateManyCategory($payload: UpdateManyCategoryPayload) {
        updateManyCategory(payload: $payload) {
            status
        }
    }
`;

const UPDATE_CATEGORY = gql`
    mutation updateCategory($payload: UpdateCategoryPayload) {
        updateCategory(payload: $payload) {
            name
        }
    }
`;

export const getCategories = (options: any) =>
    useQuery<{ getCategories: Category[] }>(CATEGORIES, options);
export const getCategoryById = (options: any) =>
    useQuery<{ getCategoryById: Category }>(CATEGORY_BY_ID, options);
export const getCategoryList = (options: any) =>
    useQuery<{ getCategoryList: Category[] }>(CATEGORY_LIST, options);
export const createCategory = (options: any) =>
    useMutation<{ createCategory: Category }>(CREATE_CATEGORY, options);
export const deleteCategory = (options: any) =>
    useMutation<{ deleteCategory: Category }>(DELETE_CATEGORY, options);
export const updateManyCategory = (options: any) =>
    useMutation<{ updateManyCategory: Category }>(UPDATE_MANY_CATEGORY, options);
export const updateCategory = (options: any) =>
    useMutation<{ updateCategory: Category }>(UPDATE_CATEGORY, options);
