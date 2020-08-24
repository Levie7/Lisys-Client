import * as React from 'react';
import Drawer from 'rc-drawer';

import { useUIContext } from 'src/shared/contexts/UIContext';

import { MenuTheme } from './Menu';
import { MenuLeft } from './MenuLeft';
import { MenuTop } from './MenuTop';

require('./MainMenu.sass');

interface MainMenuProps {
    auth: string | null;
    isMenuTop?: boolean;
    theme?: MenuTheme;
}

function MainMenuPure({ auth, isMenuTop, theme }: MainMenuProps) {
    let isMobile = useUIContext().isMobile;

    return isMobile ? (
        <Drawer className='MainMenu_DarkDrawer' getContainer={null} level={null}>
            <MenuLeft auth={auth} isMobile={isMobile} theme={theme} />
        </Drawer>
    ) : isMenuTop ? (
        <MenuTop auth={auth} theme={theme} />
    ) : (
        <MenuLeft auth={auth} isMobile={isMobile} theme={theme} />
    );
}

export const MainMenu = React.memo(MainMenuPure);
