import React, { useEffect } from 'react';

import { Lang } from 'src/core/api';

import { CrudFilter } from 'src/shared/components/Crud/CrudFilter';
import { CrudListTable } from 'src/shared/components/Crud/CrudList/CrudListTable';
import { ColumnWithLangProps } from 'src/shared/components/Table';
import { usePrevious } from 'src/shared/helpers/usePrevious';
import { queryList } from 'src/shared/graphql';

export interface MasterSearchListProps extends Lang {
    columns: ColumnWithLangProps[];
    customFilter?: { components?: React.ReactNode; value: any };
    query: any;
    showAction?: boolean;
    showSearch?: boolean;
    usePagination?: boolean;

    handleData: (data: any, isLoading?: boolean) => { list: any[]; total: number };
    handleRecord?: (recordKey: string, record?: any) => void;
}

export function MasterSearchList({
    columns,
    customFilter,
    query,
    handleData,
    handleRecord,
    showAction,
    showSearch,
    usePagination,
    ...props
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
    let data = handleData(queryDataList.data, queryDataList.loading);
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
            <CrudFilter
                customFilter={customFilter?.components}
                onSearch={handleSearch}
                showSearch={showSearch}
            />
            <CrudListTable
                {...props}
                columns={columns}
                dataSource={data.list}
                handleRecord={handleRecord}
                hasAction={showAction}
                loading={queryDataList.loading}
                onChange={handleTableChange}
                pagination={!!usePagination && page}
                showSelect
            />
        </>
    );
}
