import { Medicine } from 'src/core/api';
import { gql, useMutation, useQuery } from 'src/core/graphql';

export const MEDICINE_BY_QUERY = gql`
    query getMedicineByQuery($payload: QueryPayload) {
        getMedicineByQuery(payload: $payload) {
            barcode
            buy_price
            category {
                id
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
                id
                name
            }
            variant {
                id
                name
            }
        }
    }
`;

export const MEDICINE_LIST = gql`
    query getMedicineList($payload: ListPayload) {
        getMedicineList(payload: $payload) {
            data {
                barcode
                buy_price
                category {
                    id
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
                    id
                    name
                }
                variant {
                    id
                    name
                }
            }
            total
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

export const getMedicineByQuery = (options: any) =>
    useQuery<{ getMedicineByQuery: Medicine }>(MEDICINE_BY_QUERY, options);
export const getMedicineList = (options: any) =>
    useQuery<{ getMedicineList: Medicine[] }>(MEDICINE_LIST, options);
export const createMedicine = (options: any) =>
    useMutation<{ createMedicine: Medicine }>(CREATE_MEDICINE, options);
export const deleteMedicine = (options: any) =>
    useMutation<{ deleteMedicine: Medicine }>(DELETE_MEDICINE, options);
export const updateManyMedicine = (options: any) =>
    useMutation<{ updateManyMedicine: Medicine }>(UPDATE_MANY_MEDICINE, options);
export const updateMedicine = (options: any) =>
    useMutation<{ updateMedicine: Medicine }>(UPDATE_MEDICINE, options);
