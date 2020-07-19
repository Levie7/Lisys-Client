import * as React from 'react';

import { Lang } from 'src/core/api';
import { updateCrud } from 'src/core/graphql/crud';

import { Button, ButtonType } from 'src/shared/components/Button';
import { CrudConnectedProps } from 'src/shared/components/Crud';
import { Dropdown } from 'src/shared/components/Dropdown';
import { Icon } from 'src/shared/components/Icon';
import { Menu } from 'src/shared/components/Menu';

import { buttonAction } from './constants';

export interface ButtonActionProps extends CrudConnectedProps, Lang {
    buttonType: ButtonType;
    className?: string;
    iconType?: string;
    title: string;
}

export const ButtonAction = ({
    buttonType,
    className,
    crud,
    iconType,
    lang,
    title,
}: ButtonActionProps) => {
    let [fetch] = updateCrud();

    function handleClick() {
        fetch({ variables: { payload: crud } });
    }

    function handleMenuClick(e: any) {
        fetch({ variables: { payload: { ...crud, action: e.key } } });
    }

    function renderActions() {
        let menu = (
            <Menu onClick={handleMenuClick}>
                <Menu.Item key='active'>{buttonAction.activate[lang]}</Menu.Item>
                <Menu.Item key='inactive'>{buttonAction.inactivate[lang]}</Menu.Item>
            </Menu>
        );

        return (
            <Dropdown overlay={menu}>
                <Button className={className} id='ButtonActions'>
                    {title} {Icon['action']}
                </Button>
            </Dropdown>
        );
    }

    function renderDefault() {
        return (
            <Button
                className={className}
                id='ButtonActionDefault'
                onClick={handleClick}
                type={buttonType}
            >
                {iconType && Icon[iconType]} {title}
            </Button>
        );
    }

    return crud.action === 'action' ? renderActions() : renderDefault();
};
