import { Medicine } from 'src/core/api';
import { gql, useMutation, useQuery } from 'src/core/graphql';

export const MEDICINES = gql`
    query {
        getMedicines {
            barcode
            buy_price
            category {
                name
            }
            code
            id
            min_stock
            name
            sell_price
            status
            stock
            uom {
                name
            }
            variant {
                name
            }
        }
    }
`;

export const MEDICINE_BY_ID = gql`
    query getMedicineById($id: ID!) {
        getMedicineById(id: $id) {
            barcode
            buy_price
            category {
                id
            }
            code
            min_stock
            name
            sell_price
            status
            stock
            uom {
                id
            }
            variant {
                id
            }
        }
    }
`;

const CREATE_MEDICINE = gql`
    mutation createMedicine($payload: CreateMedicinePayload) {
        createMedicine(payload: $payload) {
            name
        }
    }
`;

const DELETE_MEDICINE = gql`
    mutation deleteMedicine($payload: DeleteMedicinePayload) {
        deleteMedicine(payload: $payload) {
            name
        }
    }
`;

const UPDATE_MANY_MEDICINE = gql`
    mutation updateManyMedicine($payload: UpdateManyMedicinePayload) {
        updateManyMedicine(payload: $payload) {
            status
        }
    }
`;

const UPDATE_MEDICINE = gql`
    mutation updateMedicine($payload: UpdateMedicinePayload) {
        updateMedicine(payload: $payload) {
            name
        }
    }
`;

export const getMedicineById = (options: any) =>
    useQuery<{ getMedicineById: Medicine }>(MEDICINE_BY_ID, options);
export const getMedicines = (options: any) =>
    useQuery<{ getMedicines: Medicine[] }>(MEDICINES, options);
export const createMedicine = (options: any) =>
    useMutation<{ createMedicine: Medicine }>(CREATE_MEDICINE, options);
export const deleteMedicine = (options: any) =>
    useMutation<{ deleteMedicine: Medicine }>(DELETE_MEDICINE, options);
export const updateManyMedicine = (options: any) =>
    useMutation<{ updateManyMedicine: Medicine }>(UPDATE_MANY_MEDICINE, options);
export const updateMedicine = (options: any) =>
    useMutation<{ updateMedicine: Medicine }>(UPDATE_MEDICINE, options);
