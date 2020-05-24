import React, { useEffect } from 'react';

import { CrudFilter } from 'src/shared/components/Crud/CrudFilter';
import { CrudListTable } from 'src/shared/components/Crud/CrudList/CrudListTable';
import { ColumnProps } from 'src/shared/components/Table';
import { usePrevious } from 'src/shared/helpers/usePrevious';
import { queryList } from 'src/shared/graphql';

interface MasterSearchListProps {
    columns: ColumnProps[];
    query: any;

    handleData: (data: any) => { list: any[]; total: number };
    handleRecord: (recordKey: string, record?: any) => void;
}

export function MasterSearchList({
    columns,
    query,
    handleData,
    handleRecord,
}: MasterSearchListProps) {
    let [page, setPage] = React.useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });
    let [filters, setFilters] = React.useState([]);
    let [sort, setSort] = React.useState<{ field?: string; order?: string }>({});
    let [search, setSearch] = React.useState('');
    let queryDataList = queryList({
        query,
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
    });
    let data = handleData(queryDataList.data);
    let prevDataTotal = usePrevious(data.total);

    useEffect(() => {
        if (!queryDataList.loading && prevDataTotal !== data.total) {
            setPage({ ...page, current: 1, total: data.total });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.total]);

    function handleSearch(value: any) {
        setSearch(value);
    }

    function handleTableChange(pagination: any, filters: any, sorter: any) {
        setPage({ ...page, current: pagination.current, pageSize: pagination.pageSize });
        setSort(sorter);
        setFilters(filters.status);
    }

    return (
        <>
            <CrudFilter onSearch={handleSearch} />
            <CrudListTable
                columns={columns}
                dataSource={data.list}
                handleRecord={handleRecord}
                loading={queryDataList.loading}
                onChange={handleTableChange}
                pagination={page}
            />
        </>
    );
}
