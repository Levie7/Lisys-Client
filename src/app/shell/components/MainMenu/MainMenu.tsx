import * as React from 'react';
import Drawer from 'rc-drawer';

import { UIContext } from 'src/shared/contexts/UIContext';

import { MenuLeft } from './MenuLeft';
import { MenuTop } from './MenuTop';

require('./MainMenu.sass');

export const MainMenu = React.memo(() => {
    const [isMenuTop] = React.useState(true);

    return (
        <UIContext.Consumer>
            {({ isMobile }) =>
                isMobile ? (
                    <Drawer className='MainMenu_DarkDrawer' getContainer={null} level={null}>
                        <MenuLeft isMobile={isMobile} />
                    </Drawer>
                ) : isMenuTop ? (
                    <MenuTop />
                ) : (
                    <MenuLeft isMobile={isMobile} />
                )
            }
        </UIContext.Consumer>
    );
});
