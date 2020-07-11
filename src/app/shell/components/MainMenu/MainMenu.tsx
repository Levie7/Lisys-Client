import * as React from 'react';
import Drawer from 'rc-drawer';

import { useUIContext } from 'src/shared/contexts/UIContext';

import { MenuLeft } from './MenuLeft';
import { MenuTop } from './MenuTop';

require('./MainMenu.sass');

interface MainMenuProps {
    auth: string | null;
    isMenuTop?: boolean;
}

function MainMenuPure({ auth, isMenuTop }: MainMenuProps) {
    let isMobile = useUIContext().isMobile;

    return isMobile ? (
        <Drawer className='MainMenu_DarkDrawer' getContainer={null} level={null}>
            <MenuLeft auth={auth} isMobile={isMobile} />
        </Drawer>
    ) : isMenuTop ? (
        <MenuTop auth={auth} />
    ) : (
        <MenuLeft auth={auth} isMobile={isMobile} />
    );
}

export const MainMenu = React.memo(MainMenuPure);
