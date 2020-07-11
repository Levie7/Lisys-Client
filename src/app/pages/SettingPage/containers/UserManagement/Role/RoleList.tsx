import React, { useEffect } from 'react';

import { USER_MANAGEMENT } from 'src/app/pages/SettingPage/containers/UserManagement/schema.gql';

import { Role } from 'src/core/api';

import { Spin } from 'src/shared/components/Spin';
import { CrudFilter } from 'src/shared/components/Crud/CrudFilter';
import { CrudListTable } from 'src/shared/components/Crud/CrudList/CrudListTable';
import { mutationForm, queryList } from 'src/shared/graphql';
import { usePrevious } from 'src/shared/helpers/usePrevious';
import { Progress } from 'src/shared/utilities/progress';

import { roleColumns } from './constants';
import { deleteRole, getRoleList, ROLE_LIST } from './schema.gql';

interface RoleListProps {
    handleRecord: (recordKey: string) => void;
}

export function RoleList({ handleRecord }: RoleListProps) {
    let [page, setPage] = React.useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });
    let [sort, setSort] = React.useState<{ field?: string; order?: string }>({});
    let [search, setSearch] = React.useState('');
    let queryDataList = queryList({
        query: getRoleList,
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
    let mutation = mutationForm({ formType: 'delete', mutations: deleteRole });
    let roles = handleData(queryDataList.data);
    let prevDataTotal = usePrevious(roles.total);

    useEffect(() => {
        if (!queryDataList.loading && prevDataTotal !== roles.total) {
            setPage({ ...page, current: 1, total: roles.total });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roles.total]);

    if (mutation.loading) return <Spin />;

    function handleData(data?: any): { list: Role[]; total: number } {
        let roleData = data?.getRoleList.data;
        let total = data?.getRoleList.total;
        if (!roleData || !roleData.length) {
            return { list: [], total: 0 };
        }

        return {
            list: roleData.map((role: Role) => ({
                key: role.id!,
                name: role.name,
                description: role.description,
            })),
            total,
        };
    }

    function handleDelete(record: any) {
        Progress(true);

        mutation.action({
            refetchQueries: [
                {
                    query: ROLE_LIST,
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
                columns={roleColumns}
                dataSource={roles.list}
                handleDelete={handleDelete}
                handleRecord={handleRecord}
                hasAction
                loading={queryDataList.loading}
                onChange={handleTableChange}
                pagination={page}
                showDelete
                showUpdate
            />
        </>
    );
}
