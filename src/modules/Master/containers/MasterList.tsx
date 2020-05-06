import React from 'react';

import { CrudListTable } from 'src/shared/components/Crud/CrudList/CrudListTable';
import { Spin } from 'src/shared/components/Spin';
import { mutationForm, queryList } from 'src/shared/graphql';
import { Message } from 'src/shared/utilities/message';
import { Progress } from 'src/shared/utilities/progress';

interface MasterListProps {
    action: string;
    columns: {
        dataIndex: string;
        key: string;
        title: string;
    }[];
    mutation: {
        delete: any;
        update: any;
    };
    query: {
        list: any;
        refetch: any;
        additionalRefetch?: any;
    };

    handleData: (data: any) => { list: any[]; total: number };
    handleRecord: (recordKey: string) => void;
    handleResetAction: () => void;
}

export function MasterList({
    action,
    columns,
    mutation,
    query,
    handleData,
    handleRecord,
    handleResetAction,
}: MasterListProps) {
    let [fetched, setFetch] = React.useState(true);
    let [selectedRowKeys, selectRowKeys] = React.useState([]);
    let [pagination, setPagination] = React.useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });
    let rowSelection = {
        selectedRowKeys,
        onChange: handleSelect,
    };
    let mutationDelete = mutationForm({ formType: 'delete', mutations: mutation.delete });
    let mutationUpdate = mutationForm({ formType: 'update', mutations: mutation.update });
    let queryDataList = queryList({
        query: query.list,
        variables: { payload: { limit: pagination.pageSize, page: pagination.current } },
    });
    let data = handleData(queryDataList.data);

    if (fetched && queryDataList.data) {
        handleFetch({ pagination });
        setFetch(false);
    }
    if (mutationDelete.loading || mutationUpdate.loading) return <Spin />;
    if (action !== 'list' && hasSelected()) {
        mutationUpdate.action({
            refetchQueries: [
                {
                    query: query.refetch,
                    variables: {
                        payload: { limit: pagination.pageSize, page: pagination.current },
                    },
                },
                {
                    query: query.additionalRefetch,
                },
            ],
            variables: {
                payload: { id: selectedRowKeys, status: action },
            },
        });
        handleResetAction();
    } else if (action !== 'list' && !hasSelected()) {
        Message('Select the data first', 'error');
        handleResetAction();
    }

    function handleDelete(record: any) {
        Progress(true);

        mutationDelete.action({
            refetchQueries: [
                {
                    query: query.refetch,
                    variables: {
                        payload: { limit: pagination.pageSize, page: pagination.current },
                    },
                },
            ],
            variables: {
                payload: { id: record.key },
            },
        });
        if (data.list.length - 1 === 0) {
            setPagination({
                ...pagination,
                current: data.total - 1 <= pagination.pageSize ? 1 : pagination.current - 1,
                total: data.total - 1,
            });
        }
    }

    function handleFetch({ pagination }: any) {
        setPagination({ ...pagination, total: data.total });
    }

    function handleSelect(selectedRowKeys: any) {
        selectRowKeys(selectedRowKeys);
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

    function hasSelected() {
        return selectedRowKeys.length > 0;
    }

    return (
        <CrudListTable
            columns={columns}
            dataSource={data.list}
            handleDelete={handleDelete}
            handleRecord={handleRecord}
            hasStatus
            loading={queryDataList.loading}
            onChange={handleTableChange}
            pagination={pagination}
            rowSelection={rowSelection}
        />
    );
}
