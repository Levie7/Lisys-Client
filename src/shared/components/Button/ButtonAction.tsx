import * as React from 'react';

import { updateCrud } from 'src/core/graphql/crud';

import { Button, ButtonType } from 'src/shared/components/Button';
import { CrudConnectedProps } from 'src/shared/components/Crud';
import { Dropdown } from 'src/shared/components/Dropdown';
import { Icon } from 'src/shared/components/Icon';
import { Menu } from 'src/shared/components/Menu';

interface ButtonActionProps extends React.HTMLAttributes<any>, CrudConnectedProps {
    buttonType: ButtonType;
    iconType?: string;
    title: string;
}

export const ButtonAction = ({
    buttonType,
    className,
    crud,
    iconType,
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
                <Menu.Item key='active'>Activate</Menu.Item>
                <Menu.Item key='inactive'>Inactivate</Menu.Item>
            </Menu>
        );

        return (
            <Dropdown overlay={menu}>
                <Button className={className} id='ButtonActions'>
                    Actions {Icon['action']}
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
