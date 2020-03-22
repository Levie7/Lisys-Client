import * as React from 'react';

import { Breadcrumb } from 'src/shared/components/Breadcrumb';

import { GeneralForm } from './GeneralForm';

export const General = React.memo(() => (
    <>
        <Breadcrumb>
            <Breadcrumb.Item href='/settings'>Settings</Breadcrumb.Item>
            <Breadcrumb.Item>General</Breadcrumb.Item>
        </Breadcrumb>
        <GeneralForm />
    </>
));
