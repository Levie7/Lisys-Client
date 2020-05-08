import * as React from 'react';
import Drawer from 'rc-drawer';

import { useUIContext } from 'src/shared/contexts/UIContext';

import { MenuLeft } from './MenuLeft';
import { MenuTop } from './MenuTop';

require('./MainMenu.sass');

interface MainMenuProps {
    isMenuTop?: boolean;
}

function MainMenuPure({ isMenuTop }: MainMenuProps) {
    let isMobile = useUIContext().isMobile;

    return isMobile ? (
        <Drawer className='MainMenu_DarkDrawer' getContainer={null} level={null}>
            <MenuLeft isMobile={isMobile} />
        </Drawer>
    ) : isMenuTop ? (
        <MenuTop />
    ) : (
        <MenuLeft isMobile={isMobile} />
    );
}

export const MainMenu = React.memo(MainMenuPure);
