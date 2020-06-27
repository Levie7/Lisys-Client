import React from 'react';

import { Action } from 'src/core/api';
import { updateCrud, useCrud } from 'src/core/graphql/crud';

import { Card } from 'src/shared/components/Card';
import { Crud } from 'src/shared/components/Crud';
import { handleFetchCrud } from 'src/shared/components/Crud/helpers';

import { MasterContentHeader } from '../components/MasterContentHeader';
import { initialize } from '../helpers';

require('./MasterCard.sass');

interface MasterCardProps {
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
}: MasterCardProps) {
    let [isInit, setInit] = React.useState(false);
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
                    <Crud showAction={showAction}>
                        {children({
                            action: crud.action,
                            recordKey,
                            handleRecord,
                            handleResetAction,
                        })}
                    </Crud>
                ) : (
                    children({})
                )}
            </Card>
        </div>
    );
}
