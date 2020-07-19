import * as React from 'react';

import { Lang } from 'src/core/api';
import { useCrud } from 'src/core/graphql/crud';
import { Crud as CrudType } from 'src/core/graphql/types';

import { CrudForm } from './CrudForm';
import { CrudList } from './CrudList';

interface CrudProps extends Lang {
    children?: React.ReactNode;
    showAction?: boolean;
    showBack?: boolean;
    showCreate?: boolean;
}

export interface CrudConnectedProps {
    crud: CrudType;
}

export function Crud({ children, ...props }: CrudProps) {
    let crud = useCrud();

    function renderAction() {
        return crud.action === 'list' ? (
            <CrudList crud={crud} {...props}>
                {children}
            </CrudList>
        ) : (
            <CrudForm crud={crud} {...props}>
                {children}
            </CrudForm>
        );
    }

    return <>{renderAction()}</>;
}
