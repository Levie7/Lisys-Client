import { MasterTotal } from 'src/core/api';
import { gql, useQuery } from 'src/core/graphql';

export const MASTER_TOTAL = gql`
    query {
        getMasterTotal {
            total_category
            total_medicine
            total_supplier
            total_uom
            total_variant
        }
    }
`;

export const getMasterTotal = (options: any) =>
    useQuery<{ getMasterTotal: MasterTotal }>(MASTER_TOTAL, options);
