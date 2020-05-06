import * as React from 'react';

import { USER_MANAGEMENT } from 'src/app/pages/SettingPage/containers/UserManagement/schema.gql';

import { Role } from 'src/core/api';

import { Spin } from 'src/shared/components/Spin';
import { CrudListTable } from 'src/shared/components/Crud/CrudList/CrudListTable';
import { mutationForm, queryList } from 'src/shared/graphql';
import { Progress } from 'src/shared/utilities/progress';

import { roleColumns } from './constants';
import { deleteRole, getRoleList, ROLE_LIST } from './schema.gql';

interface RoleListProps {
    handleRecord: (recordKey: string) => void;
}

export function RoleList({ handleRecord }: RoleListProps) {
    let [fetched, setFetch] = React.useState(true);
    let [pagination, setPagination] = React.useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });
    let mutation = mutationForm({ formType: 'delete', mutations: deleteRole });
    let queryDataList = queryList({
        query: getRoleList,
        variables: { payload: { limit: pagination.pageSize, page: pagination.current } },
    });
    let roles = handleData(queryDataList.data);

    if (fetched && queryDataList.data) {
        handleFetch({ pagination });
        setFetch(false);
    }
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
                        payload: { limit: pagination.pageSize, page: pagination.current },
                    },
                },
                { query: USER_MANAGEMENT },
            ],
            variables: {
                payload: { id: record.key },
            },
        });
        if (roles.list.length - 1 === 0) {
            setPagination({
                ...pagination,
                current: roles.total - 1 <= pagination.pageSize ? 1 : pagination.current - 1,
                total: roles.total - 1,
            });
        }
    }

    function handleFetch({ pagination }: any) {
        setPagination({ ...pagination, total: roles.total });
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
            columns={roleColumns}
            dataSource={roles.list}
            handleDelete={handleDelete}
            handleRecord={handleRecord}
            loading={queryDataList.loading}
            onChange={handleTableChange}
            pagination={pagination}
        />
    );
}
