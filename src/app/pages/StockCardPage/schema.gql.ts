import { StockCard } from 'src/core/api';
import { gql, useQuery } from 'src/core/graphql';

export const STOCK_CARD_LIST = gql`
    query getStockCardList($payload: ListPayload) {
        getStockCardList(payload: $payload) {
            data {
                _id
                qty_begin
                qty_in
                qty_out
                tag
                transaction_date
                transaction(payload: $payload) {
                    ... on Purchasing {
                        detail {
                            batch_no
                            expired_date
                        }
                        no
                        supplier {
                            name
                        }
                    }
                    ... on PurchaseReturn {
                        no
                        supplier {
                            name
                        }
                    }
                    ... on Sales {
                        no
                    }
                }
            }
            total
        }
    }
`;

export const getStockCardList = (options: any) =>
    useQuery<{ getStockCardList: StockCard }>(STOCK_CARD_LIST, options);
