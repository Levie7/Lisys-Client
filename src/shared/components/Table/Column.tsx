import { Table as AntTable } from 'antd';
import { ColumnFilterItem } from 'antd/lib/table/interface';
import * as React from 'react';

import { SupportedLang } from 'src/core/api';

export interface ColumnProps {
    dataIndex?: string;
    filters?: ColumnFilterItem[];
    key: string;
    sorter?: boolean;

    onFilter?: (value: any, record: unknown) => boolean;
    render?: (text: any, record: unknown, index: number) => React.ReactNode;
}

interface ColumnDefaultProps extends ColumnProps {
    title: string;
}

export interface ColumnWithLangProps extends ColumnProps {
    title: SupportedLang;
}

export const Column = React.memo<ColumnDefaultProps>(
    ({ dataIndex, filters, key, onFilter, render, sorter, title }) => (
        <AntTable.Column
            dataIndex={dataIndex}
            key={key}
            filters={filters}
            onFilter={onFilter}
            render={render}
            sorter={sorter}
            title={title}
        />
    )
);
