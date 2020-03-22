import * as React from 'react';

import { Button } from 'src/shared/components/Button';
import { UIContext } from 'src/shared/contexts/UIContext';

export const SaveSettingButton = React.memo(() => (
    <UIContext.Consumer>
        {({ isMobile }) => (
            <Button className={isMobile ? 'w-100' : ''} htmlType='submit' type='primary'>
                Save
            </Button>
        )}
    </UIContext.Consumer>
));
