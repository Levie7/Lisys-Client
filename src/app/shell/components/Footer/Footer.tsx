import * as React from 'react';

import { SettingCompany } from 'src/core/api';

import { Spin } from 'src/shared/components/Spin';
import { getSettings } from 'src/shared/graphql/Setting/schema.gql';
import { convertArrayOfObjectsToObject } from 'src/shared/helpers/convertArrayOfObjects';
import { ErrorHandler } from 'src/shared/utilities/errors';

export const Footer = React.memo(() => {
    let query = handleQuery();
    if (query.loading) return <Spin />;

    let company = convertArrayOfObjectsToObject(
        query.data?.getSettingsByCategory
    ) as SettingCompany;

    function handleQuery() {
        let { data, loading } = getSettings({
            onError(error: any) {
                ErrorHandler(error);
            },
            variables: { category: 'company' },
        });

        return {
            data,
            loading,
        };
    }

    return (
        <div className='bg-primary fg-white p-6 ta-center'>
            Copyright © {company.year} - {company.name}. All Right Reserved.
            <br />
            made with{' '}
            <span role='img' aria-label='Heart'>
                ❤️
            </span>{' '}
            by Lisys
        </div>
    );
});
