import * as React from 'react';

import { Breadcrumb } from 'src/shared/components/Breadcrumb';
import { Capitalized } from 'src/shared/utilities/capitalized';
import { Crud } from 'src/core/graphql/types/crud';

interface MasterContentHeaderProps {
    crud?: Crud;
    title: string;
    to: string;
}

export const MasterContentHeader = React.memo<MasterContentHeaderProps>(({ crud, title, to }) => (
    <Breadcrumb>
        <Breadcrumb.Item>Master</Breadcrumb.Item>
        <Breadcrumb.Item href={to}>{title}</Breadcrumb.Item>
        {crud && crud.action !== 'back' && (
            <Breadcrumb.Item>{Capitalized(crud.action)}</Breadcrumb.Item>
        )}
    </Breadcrumb>
));
