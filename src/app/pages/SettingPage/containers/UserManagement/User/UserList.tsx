import React, { useEffect } from 'react';

import { USER_MANAGEMENT } from 'src/app/pages/SettingPage/containers/UserManagement/schema.gql';

import { User, UserData } from 'src/core/api';

import { CrudFilter } from 'src/shared/components/Crud/CrudFilter';
import { CrudListTable } from 'src/shared/components/Crud/CrudList/CrudListTable';
import { Spin } from 'src/shared/components/Spin';
import { usePrevious } from 'src/shared/helpers/usePrevious';
import { mutationForm, queryList } from 'src/shared/graphql';
import { deleteUser, getUserList, USER_LIST } from 'src/shared/graphql/User/schema.gql';
import { Progress } from 'src/shared/utilities/progress';

import { userColumns } from './constants';

interface UserListProps {
    handleRecord: (recordKey: string) => void;
}

export function UserList({ handleRecord }: UserListProps) {
    let [page, setPage] = React.useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });
    let [sort, setSort] = React.useState<{ field?: string; order?: string }>({});
    let [search, setSearch] = React.useState('');
    let queryDataList = queryList({
        query: getUserList,
        variables: {
            payload: {
                limit: page.pageSize,
                page: page.current,
                search,
                sortField: sort.field,
                sortOrder: sort.order,
            },
        },
    });
    let mutation = mutationForm({ formType: 'delete', mutations: deleteUser });
    let users = handleData(queryDataList.data);
    let prevDataTotal = usePrevious(users.total);

    useEffect(() => {
        if (!queryDataList.loading && prevDataTotal !== users.total) {
            setPage({ ...page, current: 1, total: users.total });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [users.total]);

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
                        payload: {
                            limit: page.pageSize,
                            page: page.current,
                            search,
                            sortField: sort.field,
                            sortOrder: sort.order,
                        },
                    },
                },
                { query: USER_MANAGEMENT },
            ],
            variables: {
                payload: { id: record.key },
            },
        });
    }

    function handleSearch(value: any) {
        setSearch(value);
    }

    function handleTableChange(pagination: any, filters: any, sorter: any) {
        setPage({ ...page, current: pagination.current, pageSize: pagination.pageSize });
        setSort(sorter);
    }

    return (
        <>
            <CrudFilter onSearch={handleSearch} />
            <CrudListTable
                columns={userColumns}
                dataSource={users.list}
                handleDelete={handleDelete}
                handleRecord={handleRecord}
                loading={queryDataList.loading}
                onChange={handleTableChange}
                pagination={page}
            />
        </>
    );
}
