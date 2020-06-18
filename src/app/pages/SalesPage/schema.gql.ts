import { Sales } from 'src/core/api';
import { gql, useMutation, useQuery } from 'src/core/graphql';

export const SALES_BY_ID = gql`
    query getSalesById($id: ID!) {
        getSalesById(id: $id) {
            change_total
            no
            date
            description
            detail {
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
            grand_total
            payment_total
            qty_total
        }
    }
`;

export const SALES_LIST = gql`
    query getSalesList($payload: ListPayload) {
        getSalesList(payload: $payload) {
            data {
                no
                date
                id
                qty_total
                grand_total
                payment_total
                change_total
                updated_by {
                    id
                    name
                }
            }
            total
        }
    }
`;

const CREATE_SALES = gql`
    mutation createSales($payload: CreateSalesPayload) {
        createSales(payload: $payload) {
            no
        }
    }
`;

const DELETE_SALES = gql`
    mutation deleteSales($payload: SoftDeletePayload) {
        deleteSales(payload: $payload) {
            no
        }
    }
`;

export const getSalesById = (options: any) =>
    useQuery<{ getSalesById: Sales }>(SALES_BY_ID, options);
export const getSalesList = (options: any) =>
    useQuery<{ getSalesList: Sales[] }>(SALES_LIST, options);
export const createSales = (options: any) =>
    useMutation<{ createSales: Sales }>(CREATE_SALES, options);
export const deleteSales = (options: any) =>
    useMutation<{ deleteSales: Sales }>(DELETE_SALES, options);
