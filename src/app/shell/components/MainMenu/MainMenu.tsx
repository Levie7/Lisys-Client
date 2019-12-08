import * as React from 'react';
import Drawer from 'rc-drawer';

import { UIContext } from 'src/shared/contexts/UIContext';

import { MenuLeft } from './MenuLeft';
import { MenuTop } from './MenuTop';

interface MainMenuState {
    isMenuTop: boolean;
}

require('./MainMenu.sass');
export class MainMenu extends React.Component<{}, MainMenuState> {
    constructor(props: {}) {
        super(props);
        this.state = { isMenuTop: true };
    }

    render() {
        let { isMenuTop } = this.state;

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
    }
}
