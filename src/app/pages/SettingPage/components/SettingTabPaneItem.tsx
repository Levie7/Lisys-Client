import * as React from 'react';

import { Icon } from 'src/shared/components/Icon';
import { useUIContext } from 'src/shared/contexts/UIContext';

interface SettingTabPaneItemProps {
    description: string;
    icon: string;
    title: string;
}

export const SettingTabPaneItem = React.memo<SettingTabPaneItemProps>(
    ({ description, icon, title }) => (
        <div id='SettingTabPaneItem' className='d-flex fa-center fd-row'>
            {Icon[icon]}
            <div>
                <span className='fw-bold'>{title}</span>
                {!useUIContext().isMobile && (
                    <p id='description' className='fg-gray-light'>
                        {description}
                    </p>
                )}
            </div>
        </div>
    )
);
