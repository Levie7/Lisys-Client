import * as React from 'react';

import { Button, ButtonType } from 'src/shared/components/Button';
import { Dropdown } from 'src/shared/components/Dropdown';
import { Icon } from 'src/shared/components/Icon';
import { Menu } from 'src/shared/components/Menu';

interface ActionButtonProps extends React.HTMLAttributes<any> {
    action: 'create' | 'read' | 'update' | 'delete' | 'back' | 'list' | 'action';
    buttonType: ButtonType;
    iconType?: string;
    section: string;
    title: string;

    setAction?: (action: string) => void;
    setSection: ({ action, section }: { action: string; section: string }) => void;
}

export const ActionButton = ({
    action,
    buttonType,
    className,
    iconType,
    section,
    setAction,
    setSection,
    title,
}: ActionButtonProps) => {
    function handleClick() {
        setSection({ action, section });
    }

    function handleMenuClick(e: any) {
        setAction!(e.key);
    }

    function renderActions() {
        let menu = (
            <Menu onClick={handleMenuClick}>
                <Menu.Item key='Active'>Activate</Menu.Item>
                <Menu.Item key='Inactive'>Inactivate</Menu.Item>
            </Menu>
        );

        return (
            <Dropdown overlay={menu}>
                <Button className={className}>Actions {Icon['action']}</Button>
            </Dropdown>
        );
    }

    function renderDefault() {
        return (
            <Button className={className} onClick={handleClick} type={buttonType}>
                {iconType && Icon[iconType]} {title}
            </Button>
        );
    }

    return action === 'action' ? renderActions() : renderDefault();
};
