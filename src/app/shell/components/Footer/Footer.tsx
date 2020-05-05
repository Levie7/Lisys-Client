import * as React from 'react';

import { SettingCompany } from 'src/core/api';

import { Spin } from 'src/shared/components/Spin';
import { getSettings } from 'src/shared/graphql/Setting/schema.gql';
import { queryForm } from 'src/shared/graphql';
import { convertArrayOfObjectsToObject } from 'src/shared/helpers/convertArrayOfObjects';

function FooterPure() {
    let query = queryForm({ query: getSettings, variables: { category: 'company' } });
    if (query.loading) return <Spin />;

    let company = convertArrayOfObjectsToObject(
        query.data?.getSettingsByCategory
    ) as SettingCompany;

    return (
        <div className='bg-primary fg-white p-6 ta-center' id='Footer'>
            Copyright © {company.year} - {company.name}. All Right Reserved.
            <br />
            made with{' '}
            <span role='img' aria-label='Heart'>
                ❤️
            </span>{' '}
            by Lisys
        </div>
    );
}

export const Footer = React.memo(FooterPure);
