import * as React from 'react';

import { ButtonAction } from 'src/shared/components/Button';
import { CrudConnectedProps } from 'src/shared/components/Crud';
import { Divider } from 'src/shared/components/Divider';
import { classNames } from 'src/shared/utilities/classNames';

interface CrudListActionProps extends CrudConnectedProps {
    showAction?: boolean;
    showBack?: boolean;
}

function CrudListActionPure({ crud, showAction, showBack }: CrudListActionProps) {
    return (
        <>
            <Divider />
            <div className='d-flex fj-between mb-4'>
                <ButtonAction
                    className={classNames('fj-start mr-2', showBack ? '' : 'd-invisible')}
                    buttonType='default'
                    crud={{ ...crud, action: 'back', section: 'main' }}
                    iconType='back'
                    title='Back'
                />
                <div className='d-flex fj-end ml-2'>
                    <ButtonAction
                        buttonType='default'
                        className={classNames('mr-2', showAction ? '' : 'd-invisible')}
                        iconType='action'
                        crud={{ ...crud, action: 'action' }}
                        title='Actions'
                    />
                    <ButtonAction
                        buttonType='primary'
                        crud={{ ...crud, action: 'create' }}
                        iconType='plus'
                        title='Create'
                    />
                </div>
            </div>
        </>
    );
}

export const CrudListAction = React.memo(CrudListActionPure);
