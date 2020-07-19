import React from 'react';

import { Action, Lang } from 'src/core/api';
import { updateCrud, useCrud } from 'src/core/graphql/crud';

import { Card } from 'src/shared/components/Card';
import { Crud } from 'src/shared/components/Crud';
import { handleFetchCrud } from 'src/shared/components/Crud/helpers';

import { MasterContentHeader } from '../components/MasterContentHeader';
import { initialize } from '../helpers';

require('./MasterCard.sass');

export interface MasterCardProps extends Lang {
    children: ({
        action,
        recordKey,
        handleRecord,
        handleResetAction,
    }: {
        action?: Action;
        recordKey?: string;
        handleRecord?: (recordKey: string) => void;
        handleResetAction?: () => void;
        handleShowCreate?: (show: boolean) => void;
    }) => React.ReactNode;
    header: {
        link: string;
        title: string;
    };
    initAction?: string;
    initSection: string;
    isCrud?: boolean;
    module: string;
    showAction?: boolean;
}

export function MasterCard({
    children,
    header,
    initAction,
    initSection,
    isCrud,
    module,
    showAction,
    ...props
}: MasterCardProps) {
    let [isInit, setInit] = React.useState(false);
    let [showCreate, setShowCreate] = React.useState(false);
    let [recordKey, setRecordKey] = React.useState('');
    let crud = useCrud();
    let [fetch, { loading }] = updateCrud();
    if (loading) return null;

    !isInit && setInit(initialize({ action: initAction, fetch, initSection, isInit }));

    function handleRecord(recordKey: string) {
        handleFetchCrud({ ...crud, action: 'update', fetch });
        setRecordKey(recordKey);
    }

    function handleResetAction() {
        handleFetchCrud({ ...crud, action: 'list', fetch });
    }

    function handleShowCreate(show: boolean) {
        setShowCreate(show);
    }

    return (
        <div className='d-flex mx-8 my-4'>
            <Card className='MasterCard'>
                <MasterContentHeader
                    action={crud.action}
                    module={module}
                    title={header.title}
                    to={header.link}
                />
                {isCrud ? (
                    <Crud {...props} showAction={showAction} showCreate={showCreate}>
                        {children({
                            action: crud.action,
                            recordKey,
                            handleRecord,
                            handleResetAction,
                            handleShowCreate,
                        })}
                    </Crud>
                ) : (
                    children({})
                )}
            </Card>
        </div>
    );
}
