import * as React from 'react';

import { ButtonAction } from 'src/shared/components/Button';
import { CrudConnectedProps } from 'src/shared/components/Crud';
import { Divider } from 'src/shared/components/Divider';
import { Capitalized } from 'src/shared/utilities/capitalized';

interface CrudFormActionProps extends CrudConnectedProps {}

export const CrudFormAction = React.memo<CrudFormActionProps>(({ crud }) => (
    <>
        <Divider />
        <div className='d-flex fj-between mb-4'>
            <ButtonAction
                buttonType='default'
                crud={{ ...crud, action: 'list' }}
                iconType='left'
                title='Back'
            />
        </div>
        <Divider orientation='left'> {Capitalized(crud.section)} Form </Divider>
    </>
));
