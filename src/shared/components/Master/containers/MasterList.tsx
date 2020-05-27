import React, { useEffect } from 'react';

import { CrudFilter } from 'src/shared/components/Crud/CrudFilter';
import { CrudListTable } from 'src/shared/components/Crud/CrudList/CrudListTable';
import { Spin } from 'src/shared/components/Spin';
import { ColumnProps } from 'src/shared/components/Table';
import { usePrevious } from 'src/shared/helpers/usePrevious';
import { mutationForm, queryList } from 'src/shared/graphql';
import { Message } from 'src/shared/utilities/message';
import { Progress } from 'src/shared/utilities/progress';

interface MasterListProps {
    action: string;
    auth: string | null;
    columns: ColumnProps[];
    customFilter?: { components: React.ReactNode; value: any };
    hasStatus?: boolean;
    mutation: {
        delete: any;
        update?: any;
    };
    query: {
        list: any;
        refetch: any;
    };
    softDelete?: boolean;

    handleData: (data: any) => { list: any[]; total: number };
    handleRecord: (recordKey: string) => void;
    handleResetAction: () => void;
}

export function MasterList({
    action,
    auth,
    columns,
    customFilter,
    hasStatus,
    mutation,
    query,
    softDelete,
    handleData,
    handleRecord,
    handleResetAction,
}: MasterListProps) {
    let [selectedRowKeys, selectRowKeys] = React.useState([]);
    let [page, setPage] = React.useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });
    let [filters, setFilters] = React.useState([]);
    let [sort, setSort] = React.useState<{ field?: string; order?: string }>({});
    let [search, setSearch] = React.useState('');
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

    if (mutationDelete.loading || mutationUpdate?.loading) return <Spin />;
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

    return (
        <>
            <CrudFilter customFilter={customFilter?.components} onSearch={handleSearch} />
            <CrudListTable
                columns={columns}
                dataSource={data.list}
                handleDelete={handleDelete}
                handleRecord={handleRecord}
                hasAction
                hasStatus={hasStatus}
                loading={queryDataList.loading}
                onChange={handleTableChange}
                pagination={page}
                rowSelection={rowSelection}
            />
        </>
    );
}
