import { Menu as AntMenu } from 'antd';
import { ClickParam } from 'antd/lib/menu';
import MenuItem from 'antd/lib/menu/MenuItem';
import * as React from 'react';

interface MenuProps {
    className?: string;

    onClick?: (param: ClickParam) => void;
}

export class Menu extends React.PureComponent<MenuProps> {
    static Item: typeof MenuItem;

    render() {
        let { children, className, onClick, ...props } = this.props;

        return (
            <AntMenu {...props} className={className} onClick={onClick}>
                {children}
            </AntMenu>
        );
    }
}
Menu.Item = AntMenu.Item;
