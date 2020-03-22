import { Tabs as AntTabs } from 'antd';
import * as React from 'react';

export type TabPositions = 'top' | 'right' | 'bottom' | 'left';

interface TabPaneProps {
    tab?: React.ReactNode | string;
    key?: string;
}

interface TabsProps {
    className?: string;
    defaultActiveKey?: string;
    tabPosition?: TabPositions;
}

export class Tabs extends React.PureComponent<TabsProps> {
    static TabPane: React.ClassicComponentClass<TabPaneProps>;

    render() {
        let { children, className, defaultActiveKey, tabPosition } = this.props;

        return (
            <AntTabs
                className={className}
                defaultActiveKey={defaultActiveKey}
                tabPosition={tabPosition}
            >
                {children}
            </AntTabs>
        );
    }
}
Tabs.TabPane = AntTabs.TabPane;
