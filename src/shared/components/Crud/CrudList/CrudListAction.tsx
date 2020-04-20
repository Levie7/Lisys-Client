import * as React from 'react';

import { ButtonAction } from 'src/shared/components/Button';
import { CrudConnectedProps } from 'src/shared/components/Crud';
import { Divider } from 'src/shared/components/Divider';

interface CrudListActionProps extends CrudConnectedProps {
    showBack?: boolean;
}

export const CrudListAction = React.memo<CrudListActionProps>(({ crud, showBack }) => (
    <>
        <Divider />
        <div className='d-flex fj-between mb-4'>
            {showBack && (
                <ButtonAction
                    buttonType='default'
                    crud={{ ...crud, action: 'back', section: 'main' }}
                    iconType='back'
                    title='Back'
                />
            )}
            <ButtonAction
                buttonType='primary'
                crud={{ ...crud, action: 'create' }}
                iconType='plus'
                title='Create'
            />
        </div>
    </>
));
