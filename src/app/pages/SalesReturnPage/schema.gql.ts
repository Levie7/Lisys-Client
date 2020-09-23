import { SalesReturn } from 'src/core/api';
import { gql, useMutation, useQuery } from 'src/core/graphql';

export const SALES_RETURN_BY_ID = gql`
    query getSalesReturnById($id: ID!) {
        getSalesReturnById(id: $id) {
            date
            description
            detail {
                medicine {
                    code
                    id
                    name
                    uom {
                        id
                        name
                    }
                }
                sales {
                    id
                    no
                }
                qty
                qty_sell
                sell_price
                sub_total
            }
            grand_total
            id
            no
            qty_total
        }
    }
`;

export const SALES_RETURN_LIST = gql`
    query getSalesReturnList($payload: ListPayload) {
        getSalesReturnList(payload: $payload) {
            data {
                no
                date
                id
                qty_total
                grand_total
                updated_by {
                    id
                    name
                }
            }
            total
        }
    }
`;

const CREATE_SALES_RETURN = gql`
    mutation createSalesReturn($payload: CreateSalesReturnPayload) {
        createSalesReturn(payload: $payload) {
            no
        }
    }
`;

const DELETE_SALES_RETURN = gql`
    mutation deleteSalesReturn($payload: SoftDeletePayload) {
        deleteSalesReturn(payload: $payload) {
            status
        }
    }
`;

const UPDATE_SALES_RETURN = gql`
    mutation updateSalesReturn($payload: UpdateSalesReturnPayload) {
        updateSalesReturn(payload: $payload) {
            no
        }
    }
`;

export const getSalesReturnById = (options: any) =>
    useQuery<{ getSalesReturnById: SalesReturn }>(SALES_RETURN_BY_ID, options);
export const getSalesReturnList = (options: any) =>
    useQuery<{ getSalesReturnList: SalesReturn[] }>(SALES_RETURN_LIST, options);
export const createSalesReturn = (options: any) =>
    useMutation<{ createSalesReturn: SalesReturn }>(CREATE_SALES_RETURN, options);
export const deleteSalesReturn = (options: any) =>
    useMutation<{ deleteSalesReturn: SalesReturn }>(DELETE_SALES_RETURN, options);
export const updateSalesReturn = (options: any) =>
    useMutation<{ updateSalesReturn: SalesReturn }>(UPDATE_SALES_RETURN, options);
