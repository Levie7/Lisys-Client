import * as React from 'react';
import Drawer from 'rc-drawer';

import { UIContext } from 'src/shared/contexts/UIContext';

import { MenuLeft } from './MenuLeft';
import { MenuTop } from './MenuTop';

export interface MainMenuState {
    isMenuTop: boolean;
}

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
                        <Drawer>
                            <MenuLeft {...this.props} />
                        </Drawer>
                    ) : isMenuTop ? (
                        <MenuTop />
                    ) : (
                        <MenuLeft />
                    )
                }
            </UIContext.Consumer>
        );
    }
}
