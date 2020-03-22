import * as React from 'react';

import { Icon } from 'src/shared/components/Icon';
import { UIContext } from 'src/shared/contexts/UIContext';

interface TabPaneItemSettingProps {
    description: string;
    icon: string;
    title: string;
}

export const TabPaneItemSetting = React.memo<TabPaneItemSettingProps>(
    ({ description, icon, title }) => (
        <div className='d-flex fd-row'>
            {Icon[icon]}
            <div>
                <div className='fw-bold'>{title}</div>
                <UIContext.Consumer>
                    {({ isMobile }) =>
                        !isMobile && <div className='fg-gray-light'>{description}</div>
                    }
                </UIContext.Consumer>
            </div>
        </div>
    )
);
