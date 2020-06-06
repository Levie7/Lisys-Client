import { BuyPriceHistory } from 'src/core/api';
import { gql, useQuery } from 'src/core/graphql';

export const BUY_PRICE_HISTORY_LIST = gql`
    query getBuyPriceHistoryList($payload: ListPayload) {
        getBuyPriceHistoryList(payload: $payload) {
            data {
                created_date
                id
                medicine {
                    code
                    name
                }
                price
                purchasing {
                    no
                }
                supplier {
                    name
                }
            }
            total
        }
    }
`;

export const getBuyPriceHistoryList = (options: any) =>
    useQuery<{ getBuyPriceHistoryList: BuyPriceHistory }>(BUY_PRICE_HISTORY_LIST, options);
