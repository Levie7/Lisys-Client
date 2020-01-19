import * as React from 'react';

import { Breadcrumb } from 'src/shared/components/Breadcrumb';

import CompanyForm from './CompanyForm';

export const Company = React.memo(() => (
    <>
        <Breadcrumb>
            <Breadcrumb.Item href='/settings'>Settings</Breadcrumb.Item>
            <Breadcrumb.Item>Company</Breadcrumb.Item>
        </Breadcrumb>
        <CompanyForm />
    </>
));
