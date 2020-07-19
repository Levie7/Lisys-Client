import * as React from 'react';

import { Lang } from 'src/core/api';

import { Button } from 'src/shared/components/Button';
import { Icon } from 'src/shared/components/Icon';
import { useUIContext } from 'src/shared/contexts/UIContext';

import { saveTitle } from './constants';

export interface SaveButtonProps extends Lang {}

function SaveButtonPure({ lang }: SaveButtonProps) {
    let isMobile = useUIContext().isMobile;

    return (
        <Button id='Save' className={isMobile ? 'w-100' : ''} htmlType='submit' type='primary'>
            {Icon['save']}
            {saveTitle[lang]}
        </Button>
    );
}

export const SaveButton = React.memo(SaveButtonPure);
