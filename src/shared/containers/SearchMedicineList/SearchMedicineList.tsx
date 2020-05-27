import * as React from 'react';

import { medicineSearchListColumns } from 'src/app/pages/MasterMedicinePage/constants';

import { Button } from 'src/shared/components/Button';
import { Icon } from 'src/shared/components/Icon';
import { MasterSearchList } from 'src/shared/components/Master/containers/MasterSearchList';
import { handleMedicineData } from 'src/shared/components/Master/helpers';
import { Modal } from 'src/shared/components/Modal';
import { getMedicineList } from 'src/shared/graphql/Medicine/schema.gql';

interface SearchMedicineListProps {
    onRecordList: (recordKey: string, record?: any) => void;
}

function SearchMedicineListPure({ onRecordList }: SearchMedicineListProps, ref: any) {
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
                title='Medicine List'
                visible={list}
                width={750}
            >
                <MasterSearchList
                    columns={medicineSearchListColumns}
                    query={getMedicineList}
                    handleData={handleMedicineData}
                    handleRecord={onRecordList}
                />
            </Modal>
        </>
    );
}

export const SearchMedicineList = React.memo(React.forwardRef(SearchMedicineListPure));
