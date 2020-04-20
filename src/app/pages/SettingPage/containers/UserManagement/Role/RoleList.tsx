import * as React from 'react';

import { USER_MANAGEMENT } from 'src/app/pages/SettingPage/containers/UserManagement/schema.gql';

import { Role } from 'src/core/api';

import { Spin } from 'src/shared/components/Spin';
import { CrudListTable } from 'src/shared/components/Crud/CrudList/CrudListTable';
import { mutationForm, queryForm } from 'src/shared/graphql';
import { Progress } from 'src/shared/utilities/progress';

import { roleColumns } from './constants';
import { deleteRole, getRoles, ROLES } from './schema.gql';

interface RoleListProps {
    handleRecord: (recordKey: string) => void;
}

export function RoleList({ handleRecord }: RoleListProps) {
    let mutation = mutationForm(deleteRole, 'delete');
    let query = queryForm(getRoles);
    let roles = handleData(query.data?.getRoles);
    if (mutation.loading || query.loading) return <Spin />;

    function handleData(roles?: Role[]): Role[] {
        if (!roles || !roles.length) {
            return [];
        }

        return roles.map((role: Role) => ({
            key: role.id!,
            name: role.name,
            description: role.description,
        }));
    }

    function handleDelete(record: any) {
        Progress(true);

        mutation.action({
            refetchQueries: [{ query: ROLES }, { query: USER_MANAGEMENT }],
            variables: {
                payload: { id: record.key },
            },
        });
    }

    return (
        <CrudListTable
            columns={roleColumns}
            data={roles}
            handleDelete={handleDelete}
            handleRecord={handleRecord}
        />
    );
}
