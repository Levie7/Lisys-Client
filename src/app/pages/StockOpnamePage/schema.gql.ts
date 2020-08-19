import { StockOpname } from 'src/core/api';
import { gql, useMutation, useQuery } from 'src/core/graphql';

export const STOCK_OPNAME_BY_ID = gql`
    query getStockOpnameById($id: ID!) {
        getStockOpnameById(id: $id) {
            no
            date
            description
            detail {
                difference
                medicine {
                    id
                    code
                    name
                    uom {
                        id
                        name
                    }
                }
                physical_stock
                system_stock
            }
            id
        }
    }
`;

export const STOCK_OPNAME_LIST = gql`
    query getStockOpnameList($payload: ListPayload) {
        getStockOpnameList(payload: $payload) {
            data {
                no
                date
                id
                updated_by {
                    id
                    name
                }
            }
            total
        }
    }
`;

const CREATE_STOCK_OPNAME = gql`
    mutation createStockOpname($payload: CreateStockOpnamePayload) {
        createStockOpname(payload: $payload) {
            no
        }
    }
`;

const DELETE_STOCK_OPNAME = gql`
    mutation deleteStockOpname($payload: SoftDeletePayload) {
        deleteStockOpname(payload: $payload) {
            no
        }
    }
`;

export const getStockOpnameById = (options: any) =>
    useQuery<{ getStockOpnameById: StockOpname }>(STOCK_OPNAME_BY_ID, options);
export const getStockOpnameList = (options: any) =>
    useQuery<{ getStockOpnameList: StockOpname[] }>(STOCK_OPNAME_LIST, options);
export const createStockOpname = (options: any) =>
    useMutation<{ createStockOpname: StockOpname }>(CREATE_STOCK_OPNAME, options);
export const deleteStockOpname = (options: any) =>
    useMutation<{ deleteStockOpname: StockOpname }>(DELETE_STOCK_OPNAME, options);
