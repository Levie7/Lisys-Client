import { Sales, SalesWithDetail, SoldMedicine, SummarySales } from 'src/core/api';
import { gql, useMutation, useQuery } from 'src/core/graphql';

export const SALES_BY_ID = gql`
    query getSalesById($id: ID!) {
        getSalesById(id: $id) {
            change_total
            created_by {
                name
            }
            created_date
            no
            date
            description
            detail {
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

export const SALES_LIST_WITH_DETAIL = gql`
    query getSalesListWithDetail($payload: ListPayload) {
        getSalesListWithDetail(payload: $payload) {
            data {
                sell_price
                medicine {
                    code
                    id
                    name
                    uom {
                        id
                        name
                    }
                }
                no
                sales_id
                qty
            }
            total
        }
    }
`;

export const SOLD_MEDICINE = gql`
    query getSoldMedicine($payload: CustomFilter) {
        getSoldMedicine(payload: $payload) {
            date
            medicine {
                code
                name
            }
            sold
        }
    }
`;

export const SUMMARY_SALES = gql`
    query getSummarySalesByUser($payload: CustomFilter) {
        getSummarySalesByUser(payload: $payload) {
            created_by {
                name
            }
            date
            grand_total
            return_total
            sold
            transaction
        }
    }
`;

const CREATE_SALES = gql`
    mutation createSales($payload: CreateSalesPayload) {
        createSales(payload: $payload) {
            created_by {
                name
            }
            no
            date
            detail {
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
export const getSalesListWithDetail = (options: any) =>
    useQuery<{ getSalesListWithDetail: SalesWithDetail[] }>(SALES_LIST_WITH_DETAIL, options);
export const getSoldMedicine = (options: any) =>
    useQuery<{ getSoldMedicine: SoldMedicine }>(SOLD_MEDICINE, options);
export const getSummarySalesByUser = (options: any) =>
    useQuery<{ getSummarySalesByUser: SummarySales }>(SUMMARY_SALES, options);
export const createSales = (options: any) =>
    useMutation<{ createSales: Sales }>(CREATE_SALES, options);
export const deleteSales = (options: any) =>
    useMutation<{ deleteSales: Sales }>(DELETE_SALES, options);
