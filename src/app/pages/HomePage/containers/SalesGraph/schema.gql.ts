import { SalesByPeriod } from 'src/core/api';
import { gql, useQuery } from 'src/core/graphql';

export const SALES_DATES = gql`
    query getSalesDateByPeriod($period: String) {
        getSalesDateByPeriod(period: $period)
    }
`;

export const SALES_PER_DAY = gql`
    query getSalesPerDay($period: String) {
        getSalesPerDay(period: $period) {
            _id
            grand_total
        }
    }
`;

export const SALES_PER_MONTH = gql`
    query getSalesPerMonth($period: String) {
        getSalesPerMonth(period: $period) {
            _id
            grand_total
        }
    }
`;

export const getSalesDateByPeriod = (options: any) =>
    useQuery<{ getSalesDateByPeriod: string[] }>(SALES_DATES, options);
export const getSalesPerDay = (options: any) =>
    useQuery<{ getSalesPerDay: SalesByPeriod }>(SALES_PER_DAY, options);
export const getSalesPerMonth = (options: any) =>
    useQuery<{ getSalesPerMonth: SalesByPeriod }>(SALES_PER_MONTH, options);
