import React, { useEffect } from 'react';

import { Lang, Permission } from 'src/core/api';

import { CrudDrawer } from 'src/shared/components/Crud/CrudDrawer';
import { CrudFilter } from 'src/shared/components/Crud/CrudFilter';
import { CrudListTable } from 'src/shared/components/Crud/CrudList/CrudListTable';
import { Spin } from 'src/shared/components/Spin';
import { ColumnWithLangProps } from 'src/shared/components/Table';
import { mutationForm, queryForm, queryList } from 'src/shared/graphql';
import {
    getCreatePermissionByRoleId,
    getDeletePermissionByRoleId,
    getReadPermissionByRoleId,
    getUpdatePermissionByRoleId,
} from 'src/shared/graphql/Permission/schema.gql';
import { getUserByUsername } from 'src/shared/graphql/User/schema.gql';
import { usePrevious } from 'src/shared/helpers/usePrevious';
import { Message } from 'src/shared/utilities/message';
import { Progress } from 'src/shared/utilities/progress';

export interface MasterListProps extends Lang {
    action: string;
    auth: string | null;
    columns: ColumnWithLangProps[];
    customFilter?: { components: React.ReactNode; value: any };
    customContentDrawer?: React.ReactNode;
    hasStatus?: boolean;
    module: string;
    mutation: {
        delete: any;
        update?: any;
    };
    query: {
        list: any;
        read: any;
        refetch: any;
    };
    softDelete?: boolean;
    title: string;

    handleData: (data: any) => { list: any[]; total: number };
    handleReadData: (data: any) => any;
    handleRecord: (recordKey: string) => void;
    handleResetAction: () => void;
    handleShowCreate: (canCreate: boolean) => void;
}

export function MasterList({
    action,
    auth,
    columns,
    customFilter,
    customContentDrawer,
    hasStatus,
    module,
    mutation,
    query,
    softDelete,
    title,
    handleData,
    handleReadData,
    handleRecord,
    handleResetAction,
    handleShowCreate,
    ...props
}: MasterListProps) {
    let [initCreatePermission, setInitCreatePermission] = React.useState(false);
    let [selectedRowKeys, selectRowKeys] = React.useState([]);
    let [page, setPage] = React.useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });
    let [filters, setFilters] = React.useState([]);
    let [sort, setSort] = React.useState<{ field?: string; order?: string }>({});
    let [search, setSearch] = React.useState('');
    let [read, showRead] = React.useState(false);
    let [readRecord, setReadRecord] = React.useState('');
    let queryRead = queryForm({
        skip: readRecord === '',
        query: query.read,
        variables: { id: readRecord, payload: { id: readRecord } },
    });
    let queryUser = queryForm({
        query: getUserByUsername,
        variables: { username: auth },
    });
    let queryCreatePermission = queryForm({
        skip: !queryUser.data,
        query: getCreatePermissionByRoleId,
        variables: { role_id: queryUser.data?.getUserByUsername.role.id },
    });
    let queryDeletePermission = queryForm({
        skip: !queryUser.data,
        query: getDeletePermissionByRoleId,
        variables: { role_id: queryUser.data?.getUserByUsername.role.id },
    });
    let queryReadPermission = queryForm({
        skip: !queryUser.data,
        query: getReadPermissionByRoleId,
        variables: { role_id: queryUser.data?.getUserByUsername.role.id },
    });
    let queryUpdatePermission = queryForm({
        skip: !queryUser.data,
        query: getUpdatePermissionByRoleId,
        variables: { role_id: queryUser.data?.getUserByUsername.role.id },
    });
    let createPermission = queryCreatePermission.data?.getCreatePermissionByRoleId;
    let deletePermission = queryDeletePermission.data?.getDeletePermissionByRoleId;
    let readPermission = queryReadPermission.data?.getReadPermissionByRoleId;
    let updatePermission = queryUpdatePermission.data?.getUpdatePermissionByRoleId;
    let canCreate = handlePermission(createPermission);
    let canDelete = handlePermission(deletePermission);
    let canRead = handlePermission(readPermission);
    let canUpdate = handlePermission(updatePermission);

    let queryDataList = queryList({
        query: query.list,
        variables: {
            payload: {
                customFilter: customFilter && customFilter.value,
                filters,
                limit: page.pageSize,
                page: page.current,
                search,
                sortField: sort.field,
                sortOrder: sort.order,
            },
        },
    });
    let data = handleData(queryDataList.data);
    let readData = handleReadData(queryRead.data);
    let prevDataTotal = usePrevious(data.total);

    useEffect(() => {
        if (!queryDataList.loading && prevDataTotal !== data.total) {
            setPage({ ...page, current: 1, total: data.total });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.total]);

    let rowSelection = {
        selectedRowKeys,
        onChange: handleSelect,
    };
    let mutationDelete = mutationForm({ formType: 'delete', mutations: mutation.delete });
    let mutationUpdate =
        mutation.update && mutationForm({ formType: 'update', mutations: mutation.update });

    if (
        queryCreatePermission.loading ||
        queryDeletePermission.loading ||
        queryReadPermission.loading ||
        queryUpdatePermission.loading ||
        mutationDelete.loading ||
        mutationUpdate?.loading
    )
        return <Spin />;

    if (canCreate && !initCreatePermission) {
        handleShowCreate(!!canCreate);
        setInitCreatePermission(true);
    }
    if (action !== 'list' && hasSelected()) {
        mutationUpdate.action({
            refetchQueries: [
                {
                    query: query.refetch,
                    variables: {
                        payload: {
                            filters,
                            limit: page.pageSize,
                            page: page.current,
                            search,
                            sortField: sort.field,
                            sortOrder: sort.order,
                        },
                    },
                },
            ],
            variables: {
                payload: { id: selectedRowKeys, status: action, updated_by: auth },
            },
        });
        handleResetAction();
    } else if (action !== 'list' && !hasSelected()) {
        Message('Select the data first', 'error');
        handleResetAction();
    }

    function handleDelete(record: any) {
        Progress(true);

        let fetchPayload = { id: record.key };
        let payload = softDelete ? { ...fetchPayload, updated_by: auth } : fetchPayload;

        mutationDelete.action({
            refetchQueries: [
                {
                    query: query.refetch,
                    variables: {
                        payload: {
                            customFilter: customFilter && customFilter.value,
                            filters,
                            limit: page.pageSize,
                            page: page.current,
                            search,
                            sortField: sort.field,
                            sortOrder: sort.order,
                        },
                    },
                },
            ],
            variables: { payload },
        });
    }

    function handlePermission(permission?: Permission[]) {
        return (
            permission &&
            permission.find(
                (permission: Permission) =>
                    permission.menu?.name === title && permission.status === 'active'
            )
        );
    }

    function handleSearch(value: any) {
        setSearch(value);
    }

    function handleSelect(selectedRowKeys: any) {
        selectRowKeys(selectedRowKeys);
    }

    function handleTableChange(pagination: any, filters: any, sorter: any) {
        setPage({ ...page, current: pagination.current, pageSize: pagination.pageSize });
        setSort(sorter);
        setFilters(filters.status);
    }

    function hasSelected() {
        return selectedRowKeys.length > 0;
    }

    function handleRead(recordKey: string) {
        setReadRecord(recordKey);
        showRead(true);
    }

    function handleCloseRead() {
        setReadRecord('');
        showRead(false);
    }

    return (
        <>
            <CrudDrawer
                customContent={customContentDrawer}
                data={readData}
                loading={queryRead.loading}
                handleClose={handleCloseRead}
                module={module}
                title={title}
                visible={read}
            />
            <CrudFilter
                customFilter={customFilter?.components}
                onSearch={handleSearch}
                showSearch
            />
            <CrudListTable
                {...props}
                columns={columns}
                dataSource={data.list}
                handleDelete={handleDelete}
                handleRead={handleRead}
                handleRecord={handleRecord}
                hasAction
                hasStatus={hasStatus}
                loading={queryDataList.loading}
                onChange={handleTableChange}
                pagination={page}
                rowSelection={rowSelection}
                showDelete={!!canDelete}
                showRead={!!canRead}
                showUpdate={!!canUpdate}
            />
        </>
    );
}
