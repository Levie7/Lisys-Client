import * as React from 'react';

import { Action } from 'src/core/api';

import { Breadcrumb } from 'src/shared/components/Breadcrumb';
import { Capitalized } from 'src/shared/utilities/capitalized';

interface MasterContentHeaderProps {
    action: Action;
    module: string;
    title: string;
    to: string;
}

export const MasterContentHeader = React.memo<MasterContentHeaderProps>(
    ({ action, module, title, to }) => (
        <Breadcrumb>
            <Breadcrumb.Item>{module}</Breadcrumb.Item>
            <Breadcrumb.Item href={to}>{title}</Breadcrumb.Item>
            {action !== 'back' && <Breadcrumb.Item>{Capitalized(action)}</Breadcrumb.Item>}
        </Breadcrumb>
    )
);
