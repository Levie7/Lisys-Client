import * as React from 'react';

import { Lang } from 'src/core/api';

import { Button } from 'src/shared/components/Button';
import { Icon } from 'src/shared/components/Icon';
import { MasterSearchList } from 'src/shared/components/Master/containers/MasterSearchList';
import { handleSalesData, handleSalesDetailData } from 'src/shared/components/Sales/helpers';
import { Modal } from 'src/shared/components/Modal';
import { getSalesList, getSalesListWithDetail } from 'src/shared/graphql/Sales/schema.gql';
import {
    salesSearchListColumns,
    salesWithDetailSearchListColumns,
} from 'src/app/pages/SalesPage/constants';

export interface SearchSalesListProps extends Lang {
    withDetail?: boolean;

    onRecordList: (recordKey: string, record?: any) => void;
}

function SearchSalesListPure(
    { onRecordList, withDetail, ...props }: SearchSalesListProps,
    ref: any
) {
    let [list, showList] = React.useState(false);

    React.useImperativeHandle(ref, () => ({
        closeList() {
            handleCloseList();
        },
    }));

    function handleCloseList() {
        showList(false);
    }

    function handleShowList() {
        showList(true);
    }
    let columns = salesSearchListColumns;
    let handleData: any = handleSalesData;
    let query: any = getSalesList;
    if (withDetail) {
        columns = salesWithDetailSearchListColumns;
        handleData = handleSalesDetailData;
        query = getSalesListWithDetail;
    }

    return (
        <>
            <Button id='List' onClick={handleShowList} type='default'>
                {Icon['list']} List
            </Button>
            <Modal
                footer={null}
                onCancel={handleCloseList}
                title='Sales List'
                visible={list}
                width={750}
            >
                <MasterSearchList
                    {...props}
                    columns={columns}
                    query={query}
                    handleData={handleData}
                    handleRecord={onRecordList}
                    showAction
                    showSearch
                    usePagination
                />
            </Modal>
        </>
    );
}

export const SearchSalesList = React.memo(React.forwardRef(SearchSalesListPure));
