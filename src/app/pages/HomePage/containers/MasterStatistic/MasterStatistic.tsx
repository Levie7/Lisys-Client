import * as React from 'react';

import { Spin } from 'src/shared/components/Spin';
import { StatisticCard } from 'src/shared/components/StatisticCard';
import { queryList } from 'src/shared/graphql';

import { masterTotalStatistic } from './constants';
import { getMasterTotal } from './schema.gql';

export function MasterStatistic() {
    let getMasterStatistic = queryList({ query: getMasterTotal });
    if (getMasterStatistic.loading) return <Spin />;

    return (
        <div className='d-flex fd-row fj-around mx-8 my-8'>
            {masterTotalStatistic.map((masterTotal) => (
                <StatisticCard
                    key={masterTotal.value}
                    icon={masterTotal.icon}
                    title={masterTotal.title}
                    value={getMasterStatistic.data?.getMasterTotal[masterTotal.value]}
                />
            ))}
        </div>
    );
}
