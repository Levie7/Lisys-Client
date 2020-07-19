import * as React from 'react';

import { Lang } from 'src/core/api';

import { ButtonAction } from 'src/shared/components/Button';
import { CrudConnectedProps } from 'src/shared/components/Crud';
import { Divider } from 'src/shared/components/Divider';
import { classNames } from 'src/shared/utilities/classNames';

import { crudButton } from './constants';

export interface CrudListActionProps extends CrudConnectedProps, Lang {
    showAction?: boolean;
    showBack?: boolean;
    showCreate?: boolean;
}

function CrudListActionPure({
    crud,
    showAction,
    showBack,
    showCreate,
    ...props
}: CrudListActionProps) {
    let { lang } = { ...props };

    return (
        <>
            <Divider />
            <div className='d-flex fj-between mb-4'>
                <ButtonAction
                    {...props}
                    className={classNames('fj-start mr-2', showBack ? '' : 'd-invisible')}
                    buttonType='default'
                    crud={{ ...crud, action: 'back', section: 'main' }}
                    iconType='back'
                    title={crudButton.back[lang]}
                />
                <div className='d-flex fj-end ml-2'>
                    <ButtonAction
                        {...props}
                        buttonType='default'
                        className={classNames('mr-2', showAction ? '' : 'd-invisible')}
                        iconType='action'
                        crud={{ ...crud, action: 'action' }}
                        title={crudButton.action[lang]}
                    />
                    <ButtonAction
                        {...props}
                        buttonType='primary'
                        className={showCreate ? '' : 'd-invisible'}
                        crud={{ ...crud, action: 'create' }}
                        iconType='plus'
                        title={crudButton.create[lang]}
                    />
                </div>
            </div>
        </>
    );
}

export const CrudListAction = React.memo(CrudListActionPure);
