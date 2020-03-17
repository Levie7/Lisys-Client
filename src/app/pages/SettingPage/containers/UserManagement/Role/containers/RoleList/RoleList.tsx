import * as React from 'react';

import { USER_MANAGEMENT } from 'src/app/pages/SettingPage/containers/UserManagement/schema.gql';

import { Role } from 'src/core/api';

import { Spin } from 'src/shared/components/Spin';
import { Column, Table, TableAction } from 'src/shared/components/Table';
import { mutationForm } from 'src/shared/graphql/mutationForm';
import { ErrorHandler } from 'src/shared/utilities/errors';
import { Delete } from 'src/shared/utilities/delete';
import { Progress } from 'src/shared/utilities/progress';

import { roleColumns } from './constants';
import { deleteRole, getRoles, ROLES } from '../schema.gql';

interface RoleListProps {
    handleRecord: (recordKey: string) => void;
}

export const RoleList = React.memo<RoleListProps>(({ handleRecord }) => {
    let mutation = mutationForm('delete', deleteRole);
    let query = handleQuery();
    let roles: Role[] = handleData(query.data?.getRoles);

    if (mutation.loading || query.loading) return <Spin />;

    function handleData(role?: Role[]) {
        if (!role || !role.length) {
            return [];
        }

        return role.map((role: Role) => {
            return { key: role.id!, name: role.name, description: role.description };
        });
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

    function handleQuery() {
        let { data, loading } = getRoles({
            onError(error: any) {
                ErrorHandler(error);
            },
        });

        return {
            data,
            loading,
        };
    }

    function handleUpdate(recordKey: string) {
        handleRecord(recordKey);
    }

    return (
        <Table dataSource={roles}>
            {roleColumns.map((column: any) => (
                <Column dataIndex={column.dataIndex} key={column.key} title={column.title} />
            ))}
            <Column
                title='Action'
                key='action'
                render={(text, record) => (
                    <>
                        <TableAction
                            iconType='edit'
                            record={record}
                            title='Edit'
                            onClick={handleUpdate}
                        />
                        <Delete confirm={handleDelete} recordKey={record} />
                    </>
                )}
            />
        </Table>
    );
});
