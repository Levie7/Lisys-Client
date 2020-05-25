import * as React from 'react';

import { purchaseSearchListColumns } from 'src/app/pages/PurchaseListPage/constants';

import { Button } from 'src/shared/components/Button';
import { Icon } from 'src/shared/components/Icon';
import { MasterSearchList } from 'src/shared/components/Master/containers/MasterSearchList';
import { handlePurchasingData } from 'src/shared/components/Purchasing/helpers';
import { Modal } from 'src/shared/components/Modal';
import { getPurchasingList } from 'src/shared/graphql/Purchasing/schema.gql';

interface SearchPurchasingListProps {
    supplier_id: string;

    onRecordList: (recordKey: string, record?: any) => void;
}

function SearchPurchasingListPure(
    { onRecordList, supplier_id }: SearchPurchasingListProps,
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
                    columns={purchaseSearchListColumns}
                    customFilter={{ value: { supplier: supplier_id } }}
                    query={getPurchasingList}
                    handleData={handlePurchasingData}
                    handleRecord={onRecordList}
                />
            </Modal>
        </>
    );
}

export const SearchPurchasingList = React.memo(React.forwardRef(SearchPurchasingListPure));
