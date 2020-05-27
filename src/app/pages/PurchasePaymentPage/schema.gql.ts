import { PurchasePayment } from 'src/core/api';
import { gql, useMutation, useQuery } from 'src/core/graphql';

export const PURCHASE_PAYMENT_BY_ID = gql`
    query getPurchasePaymentById($id: ID!) {
        getPurchasePaymentById(id: $id) {
            credit_total
            no
            date
            description
            detail {
                id
                purchasing {
                    credit_total
                    date
                    due_date
                    grand_total
                    id
                    no
                }
                payment_amount
            }
            id
            payment_method
            payment_no
            payment_total
            supplier {
                id
                name
            }
        }
    }
`;

export const PURCHASE_PAYMENT_LIST = gql`
    query getPurchasePaymentList($payload: ListPayload) {
        getPurchasePaymentList(payload: $payload) {
            data {
                no
                date
                id
                supplier {
                    id
                    name
                }
                payment_method
                payment_no
                credit_total
                payment_total
                updated_by {
                    id
                    name
                }
            }
            total
        }
    }
`;

const CREATE_PURCHASE_PAYMENT = gql`
    mutation createPurchasePayment($payload: CreatePurchasePaymentPayload) {
        createPurchasePayment(payload: $payload) {
            no
        }
    }
`;

const DELETE_PURCHASE_PAYMENT = gql`
    mutation deletePurchasePayment($payload: DeletePurchasePaymentPayload) {
        deletePurchasePayment(payload: $payload) {
            status
        }
    }
`;

const UPDATE_PURCHASE_PAYMENT = gql`
    mutation updatePurchasePayment($payload: UpdatePurchasePaymentPayload) {
        updatePurchasePayment(payload: $payload) {
            no
        }
    }
`;

export const getPurchasePaymentById = (options: any) =>
    useQuery<{ getPurchasePaymentById: PurchasePayment }>(PURCHASE_PAYMENT_BY_ID, options);
export const getPurchasePaymentList = (options: any) =>
    useQuery<{ getPurchasePaymentList: PurchasePayment[] }>(PURCHASE_PAYMENT_LIST, options);
export const createPurchasePayment = (options: any) =>
    useMutation<{ createPurchasePayment: PurchasePayment }>(CREATE_PURCHASE_PAYMENT, options);
export const deletePurchasePayment = (options: any) =>
    useMutation<{ deletePurchasePayment: PurchasePayment }>(DELETE_PURCHASE_PAYMENT, options);
export const updatePurchasePayment = (options: any) =>
    useMutation<{ updatePurchasePayment: PurchasePayment }>(UPDATE_PURCHASE_PAYMENT, options);
