import { Supplier } from 'src/core/api';
import { gql, useMutation, useQuery } from 'src/core/graphql';

export const SUPPLIER_BY_ID = gql`
    query getSupplierById($id: ID!) {
        getSupplierById(id: $id) {
            account_name
            account_no
            address
            bank
            city
            contact
            email
            name
            npwp
            phone
            province
            zip_code
        }
    }
`;

export const SUPPLIER_LIST = gql`
    query getSupplierList($payload: ListPayload) {
        getSupplierList(payload: $payload) {
            data {
                id
                name
                phone
                status
            }
            total
        }
    }
`;

export const SUPPLIERS = gql`
    query {
        getSuppliers {
            id
            name
        }
    }
`;

const CREATE_SUPPLIER = gql`
    mutation createSupplier($payload: CreateSupplierPayload) {
        createSupplier(payload: $payload) {
            name
        }
    }
`;

const DELETE_SUPPLIER = gql`
    mutation deleteSupplier($payload: DeleteSupplierPayload) {
        deleteSupplier(payload: $payload) {
            name
        }
    }
`;

const UPDATE_MANY_SUPPLIER = gql`
    mutation updateManySupplier($payload: UpdateManySupplierPayload) {
        updateManySupplier(payload: $payload) {
            status
        }
    }
`;

const UPDATE_SUPPLIER = gql`
    mutation updateSupplier($payload: UpdateSupplierPayload) {
        updateSupplier(payload: $payload) {
            name
        }
    }
`;

export const getSupplierById = (options: any) =>
    useQuery<{ getSupplierById: Supplier }>(SUPPLIER_BY_ID, options);
export const getSupplierList = (options: any) =>
    useQuery<{ getSupplierList: Supplier[] }>(SUPPLIER_LIST, options);
export const getSuppliers = (options: any) =>
    useQuery<{ getSuppliers: Supplier[] }>(SUPPLIERS, options);
export const createSupplier = (options: any) =>
    useMutation<{ createSupplier: Supplier }>(CREATE_SUPPLIER, options);
export const deleteSupplier = (options: any) =>
    useMutation<{ deleteSupplier: Supplier }>(DELETE_SUPPLIER, options);
export const updateManySupplier = (options: any) =>
    useMutation<{ updateManySupplier: Supplier }>(UPDATE_MANY_SUPPLIER, options);
export const updateSupplier = (options: any) =>
    useMutation<{ updateSupplier: Supplier }>(UPDATE_SUPPLIER, options);
