import * as React from 'react';

import { Breadcrumb } from 'src/shared/components/Breadcrumb';
import { Capitalized } from 'src/shared/utilities/capitalized';
import { Crud } from 'src/core/graphql/types/crud';

interface SettingContentHeaderProps {
    crud?: Crud;
    title: string;
}

export const SettingContentHeader = React.memo<SettingContentHeaderProps>(({ crud, title }) => (
    <Breadcrumb>
        <Breadcrumb.Item href='/settings'>Settings</Breadcrumb.Item>
        <Breadcrumb.Item>{title}</Breadcrumb.Item>
        {crud && crud.section !== 'main' && (
            <Breadcrumb.Item>{Capitalized(crud.section)}</Breadcrumb.Item>
        )}
        {crud && crud.action !== 'back' && (
            <Breadcrumb.Item>{Capitalized(crud.action)}</Breadcrumb.Item>
        )}
    </Breadcrumb>
));
