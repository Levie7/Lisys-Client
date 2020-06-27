import { PurchaseReturn } from 'src/core/api';
import { gql, useMutation, useQuery } from 'src/core/graphql';

export const PURCHASE_RETURN_BY_ID = gql`
    query getPurchaseReturnById($id: ID!) {
        getPurchaseReturnById(id: $id) {
            cash_total
            credit_discount_total
            date
            description
            detail {
                buy_price
                discount_amount
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
                purchasing {
                    id
                    no
                }
                qty
                qty_buy
            }
            grand_total
            id
            no
            qty_total
            supplier {
                id
                name
            }
        }
    }
`;

export const PURCHASE_RETURN_LIST = gql`
    query getPurchaseReturnList($payload: ListPayload) {
        getPurchaseReturnList(payload: $payload) {
            data {
                no
                date
                id
                supplier {
                    id
                    name
                }
                qty_total
                grand_total
                cash_total
                credit_discount_total
                updated_by {
                    id
                    name
                }
            }
            total
        }
    }
`;

const CREATE_PURCHASE_RETURN = gql`
    mutation createPurchaseReturn($payload: CreatePurchaseReturnPayload) {
        createPurchaseReturn(payload: $payload) {
            no
        }
    }
`;

const DELETE_PURCHASE_RETURN = gql`
    mutation deletePurchaseReturn($payload: SoftDeletePayload) {
        deletePurchaseReturn(payload: $payload) {
            status
        }
    }
`;

const UPDATE_PURCHASE_RETURN = gql`
    mutation updatePurchaseReturn($payload: UpdatePurchaseReturnPayload) {
        updatePurchaseReturn(payload: $payload) {
            no
        }
    }
`;

export const getPurchaseReturnById = (options: any) =>
    useQuery<{ getPurchaseReturnById: PurchaseReturn }>(PURCHASE_RETURN_BY_ID, options);
export const getPurchaseReturnList = (options: any) =>
    useQuery<{ getPurchaseReturnList: PurchaseReturn[] }>(PURCHASE_RETURN_LIST, options);
export const createPurchaseReturn = (options: any) =>
    useMutation<{ createPurchaseReturn: PurchaseReturn }>(CREATE_PURCHASE_RETURN, options);
export const deletePurchaseReturn = (options: any) =>
    useMutation<{ deletePurchaseReturn: PurchaseReturn }>(DELETE_PURCHASE_RETURN, options);
export const updatePurchaseReturn = (options: any) =>
    useMutation<{ updatePurchaseReturn: PurchaseReturn }>(UPDATE_PURCHASE_RETURN, options);
