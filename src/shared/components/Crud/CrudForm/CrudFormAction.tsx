import * as React from 'react';

import { Lang } from 'src/core/api';

import { ButtonAction } from 'src/shared/components/Button';
import { CrudConnectedProps } from 'src/shared/components/Crud';
import { Divider } from 'src/shared/components/Divider';
import { Capitalized } from 'src/shared/utilities/capitalized';

import { crudButton } from '../CrudList/constants';

interface CrudFormActionProps extends CrudConnectedProps, Lang {}

export const CrudFormAction = React.memo<CrudFormActionProps>(({ crud, lang }) => (
    <>
        <Divider />
        <div className='d-flex fj-between mb-4'>
            <ButtonAction
                buttonType='default'
                crud={{ ...crud, action: 'list' }}
                iconType='back'
                lang={lang}
                title={crudButton.back[lang]}
            />
        </div>
        <Divider orientation='left'> {Capitalized(crud.section.replace(/_/g, ' '))} Form </Divider>
    </>
));
