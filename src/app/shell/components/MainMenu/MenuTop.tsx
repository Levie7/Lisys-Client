import * as React from 'react';

import { Picture } from 'src/shared/components/Picture';
import { classNames } from 'src/shared/utilities/classNames';

import { logo } from './constants';
import { Menu, MenuTheme } from './Menu';

interface MenuTopProps {
    auth: string | null;
    theme?: MenuTheme;
}

function MenuTopPure({ auth, theme }: MenuTopProps) {
    let pictureTheme: MenuTheme = 'dark';
    let pictureClassName = 'bg-white';

    if (theme === 'dark') {
        pictureTheme = 'light';
        pictureClassName = 'bg-primary';
    }

    return (
        <div id='MenuTop' className='d-flex'>
            <Picture
                alt={logo[pictureTheme].alt}
                className={classNames('px-4', pictureClassName)}
                height='46px'
                src={logo[pictureTheme].url}
                title={logo[pictureTheme].title}
            />
            <Menu auth={auth} className='w-100' mode='horizontal' theme={theme} />
        </div>
    );
}

export const MenuTop = React.memo(MenuTopPure);
