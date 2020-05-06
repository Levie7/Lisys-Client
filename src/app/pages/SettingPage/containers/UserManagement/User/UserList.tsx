import * as React from 'react';

import { USER_MANAGEMENT } from 'src/app/pages/SettingPage/containers/UserManagement/schema.gql';

import { User, UserData } from 'src/core/api';

import { CrudListTable } from 'src/shared/components/Crud/CrudList/CrudListTable';
import { Spin } from 'src/shared/components/Spin';
import { mutationForm, queryList } from 'src/shared/graphql';
import { Progress } from 'src/shared/utilities/progress';

import { userColumns } from './constants';
import { deleteUser, getUserList, USER_LIST } from './schema.gql';

interface UserListProps {
    handleRecord: (recordKey: string) => void;
}

export function UserList({ handleRecord }: UserListProps) {
    let [fetched, setFetch] = React.useState(true);
    let [pagination, setPagination] = React.useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });
    let mutation = mutationForm({ formType: 'delete', mutations: deleteUser });
    let queryDataList = queryList({
        query: getUserList,
        variables: { payload: { limit: pagination.pageSize, page: pagination.current } },
    });
    let users = handleData(queryDataList.data);

    if (fetched && queryDataList.data) {
        handleFetch({ pagination });
        setFetch(false);
    }
    if (mutation.loading) return <Spin />;

    function handleData(data?: any): { list: UserData[]; total: number } {
        let userData = data?.getUserList.data;
        let total = data?.getUserList.total;
        if (!userData || !userData.length) {
            return { list: [], total: 0 };
        }

        return {
            list: userData.map((user: User) => ({
                key: user.id!,
                name: user.name,
                password: user.password,
                role_name: user.role!.name,
                username: user.username,
            })),
            total,
        };
    }

    function handleDelete(record: any) {
        Progress(true);

        mutation.action({
            refetchQueries: [
                {
                    query: USER_LIST,
                    variables: {
                        payload: { limit: pagination.pageSize, page: pagination.current },
                    },
                },
                { query: USER_MANAGEMENT },
            ],
            variables: {
                payload: { id: record.key },
            },
        });
        if (users.list.length - 1 === 0) {
            setPagination({
                ...pagination,
                current: users.total - 1 <= pagination.pageSize ? 1 : pagination.current - 1,
                total: users.total - 1,
            });
        }
    }

    function handleFetch({ pagination }: any) {
        setPagination({ ...pagination, total: users.total });
    }

    function handleTableChange(pagination: any, filters: any, sorter: any) {
        queryDataList.fetchMore({
            variables: { payload: { limit: pagination.pageSize, page: pagination.current } },
            updateQuery: (prev: any, { fetchMoreResult }: any) => {
                if (!fetchMoreResult) return prev;
                return fetchMoreResult;
            },
        });
        handleFetch({ pagination });
    }

    return (
        <CrudListTable
            columns={userColumns}
            dataSource={users.list}
            handleDelete={handleDelete}
            handleRecord={handleRecord}
            loading={queryDataList.loading}
            onChange={handleTableChange}
            pagination={pagination}
        />
    );
}
