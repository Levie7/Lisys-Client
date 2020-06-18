import { Purchasing } from 'src/core/api';
import { gql, useMutation, useQuery } from 'src/core/graphql';

export const PURCHASING_BY_ID = gql`
    query getPurchasingById($id: ID!) {
        getPurchasingById(id: $id) {
            no
            date
            description
            due_date
            detail {
                batch_no
                buy_price
                expired_date
                id
                medicine {
                    id
                    code
                    name
                    uom {
                        id
                        name
                    }
                }
                qty
                sell_price
                sub_total
            }
            id
            supplier {
                id
                name
            }
            qty_total
            grand_total
            credit_total
        }
    }
`;

export const PURCHASING_LIST = gql`
    query getPurchasingList($payload: ListPayload) {
        getPurchasingList(payload: $payload) {
            data {
                no
                date
                detail {
                    buy_price
                    id
                    medicine {
                        code
                        id
                        name
                        uom {
                            id
                            name
                        }
                    }
                    qty
                }
                due_date
                id
                supplier {
                    id
                    name
                }
                qty_total
                grand_total
                credit_total
                updated_by {
                    id
                    name
                }
            }
            total
        }
    }
`;

const CREATE_PURCHASING = gql`
    mutation createPurchasing($payload: CreatePurchasingPayload) {
        createPurchasing(payload: $payload) {
            no
        }
    }
`;

const DELETE_PURCHASING = gql`
    mutation deletePurchasing($payload: SoftDeletePayload) {
        deletePurchasing(payload: $payload) {
            no
        }
    }
`;

const UPDATE_PURCHASING = gql`
    mutation updatePurchasing($payload: UpdatePurchasingPayload) {
        updatePurchasing(payload: $payload) {
            no
        }
    }
`;

export const getPurchasingById = (options: any) =>
    useQuery<{ getPurchasingById: Purchasing }>(PURCHASING_BY_ID, options);
export const getPurchasingList = (options: any) =>
    useQuery<{ getPurchasingList: Purchasing[] }>(PURCHASING_LIST, options);
export const createPurchasing = (options: any) =>
    useMutation<{ createPurchasing: Purchasing }>(CREATE_PURCHASING, options);
export const deletePurchasing = (options: any) =>
    useMutation<{ deletePurchasing: Purchasing }>(DELETE_PURCHASING, options);
export const updatePurchasing = (options: any) =>
    useMutation<{ updatePurchasing: Purchasing }>(UPDATE_PURCHASING, options);
