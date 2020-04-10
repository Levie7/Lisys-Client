import * as React from 'react';

import { USER_MANAGEMENT } from 'src/app/pages/SettingPage/containers/UserManagement/schema.gql';

import { User, UserData } from 'src/core/api';

import { Spin } from 'src/shared/components/Spin';
import { Column, Table, TableAction } from 'src/shared/components/Table';
import { mutationForm } from 'src/shared/graphql/mutationForm';
import { Delete } from 'src/shared/utilities/delete';
import { ErrorHandler } from 'src/shared/utilities/errors';
import { Progress } from 'src/shared/utilities/progress';

import { userColumns } from './constants';
import { deleteUser, getUsers, USERS } from '../schema.gql';

interface UserListProps {
    handleRecord: (recordKey: string) => void;
}

export const UserList = React.memo<UserListProps>(({ handleRecord }) => {
    let mutation = mutationForm('delete', deleteUser);
    let query = handleQuery();
    let users: UserData[] = handleData(query.data?.getUsers);
    if (mutation.loading || query.loading) return <Spin />;

    function handleData(user?: User[]) {
        if (!user || !user.length) {
            return [];
        }

        return user.map((user: User) => {
            return {
                key: user.id!,
                name: user.name,
                password: user.password,
                role_name: user.role!.name,
                username: user.username,
            };
        });
    }

    function handleDelete(record: any) {
        Progress(true);

        mutation.action({
            refetchQueries: [{ query: USERS }, { query: USER_MANAGEMENT }],
            variables: {
                payload: { id: record.key },
            },
        });
    }

    function handleQuery() {
        let { data, loading } = getUsers({
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
        <Table dataSource={users}>
            {userColumns.map((column: any) => (
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
