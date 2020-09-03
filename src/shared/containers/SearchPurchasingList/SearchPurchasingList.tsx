import * as React from 'react';

import {
    purchaseSearchListColumns,
    purchaseWithDetailSearchListColumns,
} from 'src/app/pages/PurchaseListPage/constants';

import { Lang } from 'src/core/api';

import { Button } from 'src/shared/components/Button';
import { Icon } from 'src/shared/components/Icon';
import { MasterSearchList } from 'src/shared/components/Master/containers/MasterSearchList';
import {
    handlePurchasingData,
    handlePurchasingDetailData,
} from 'src/shared/components/Purchasing/helpers';
import { Modal } from 'src/shared/components/Modal';
import {
    getPurchasingList,
    getPurchasingListWithDetail,
} from 'src/shared/graphql/Purchasing/schema.gql';

export interface SearchPurchasingListProps extends Lang {
    is_not_paid?: boolean;
    supplier_id: string;
    withDetail?: boolean;

    onRecordList: (recordKey: string, record?: any) => void;
}

function SearchPurchasingListPure(
    { is_not_paid, onRecordList, supplier_id, withDetail, ...props }: SearchPurchasingListProps,
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
    let columns = purchaseSearchListColumns;
    let handleData: any = handlePurchasingData;
    let query: any = getPurchasingList;
    if (withDetail) {
        columns = purchaseWithDetailSearchListColumns;
        handleData = handlePurchasingDetailData;
        query = getPurchasingListWithDetail;
    }

    return (
        <>
            <Button id='List' onClick={handleShowList} type='default'>
                {Icon['list']} List
            </Button>
            <Modal
                footer={null}
                onCancel={handleCloseList}
                title='Purchasing List'
                visible={list}
                width={750}
            >
                <MasterSearchList
                    {...props}
                    columns={columns}
                    customFilter={{ value: { is_not_paid, supplier: supplier_id } }}
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

export const SearchPurchasingList = React.memo(React.forwardRef(SearchPurchasingListPure));
