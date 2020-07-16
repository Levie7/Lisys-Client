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

export const MEDICINES = gql`
    query getMedicines {
        getMedicines {
            code
            name
            stock
            uom {
                name
            }
            sell_price
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
    mutation deleteMedicine($payload: DeletePayload) {
        deleteMedicine(payload: $payload) {
            name
        }
    }
`;

const UPDATE_MANY_MEDICINE = gql`
    mutation updateManyMedicine($payload: UpdateManyPayload) {
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

export const getMedicines = (options: any) =>
    useQuery<{ getMedicines: Medicine[] }>(MEDICINES, options);
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
