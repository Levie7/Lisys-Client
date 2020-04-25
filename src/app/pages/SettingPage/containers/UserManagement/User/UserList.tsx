import * as React from 'react';

import { USER_MANAGEMENT } from 'src/app/pages/SettingPage/containers/UserManagement/schema.gql';

import { User, UserData } from 'src/core/api';

import { CrudListTable } from 'src/shared/components/Crud/CrudList/CrudListTable';
import { Spin } from 'src/shared/components/Spin';
import { mutationForm, queryForm } from 'src/shared/graphql';
import { Progress } from 'src/shared/utilities/progress';

import { userColumns } from './constants';
import { deleteUser, getUsers, USERS } from './schema.gql';

interface UserListProps {
    handleRecord: (recordKey: string) => void;
}

export function UserList({ handleRecord }: UserListProps) {
    let mutation = mutationForm(deleteUser, 'delete');
    let query = queryForm({ query: getUsers });
    let users = handleData(query.data?.getUsers);
    if (mutation.loading || query.loading) return <Spin />;

    function handleData(users?: User[]): UserData[] {
        if (!users || !users.length) {
            return [];
        }

        return users.map((user: User) => ({
            key: user.id!,
            name: user.name,
            password: user.password,
            role_name: user.role!.name,
            username: user.username,
        }));
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

    return (
        <CrudListTable
            columns={userColumns}
            data={users}
            handleDelete={handleDelete}
            handleRecord={handleRecord}
        />
    );
}
