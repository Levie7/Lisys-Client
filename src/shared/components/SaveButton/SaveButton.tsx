import * as React from 'react';

import { Button } from 'src/shared/components/Button';
import { useUIContext } from 'src/shared/contexts/UIContext';

function SaveButtonPure() {
    let isMobile = useUIContext().isMobile;

    return (
        <Button id='Save' className={isMobile ? 'w-100' : ''} htmlType='submit' type='primary'>
            Save
        </Button>
    );
}

export const SaveButton = React.memo(SaveButtonPure);
