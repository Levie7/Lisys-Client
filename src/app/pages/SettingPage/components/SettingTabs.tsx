import * as React from 'react';

import { TabPositions, Tabs } from 'src/shared/components/Tabs';

import { tabData } from '../constants';
import { SettingContent } from './SettingContent';
import { SettingTabPaneItem } from './SettingTabPaneItem';

interface SettingTabsProps {
    position: TabPositions;
}

function SettingTabsPure({ position }: SettingTabsProps) {
    return (
        <Tabs defaultActiveKey='3' tabPosition={position}>
            {tabData.map((tab) => (
                <Tabs.TabPane
                    key={tab.key}
                    tab={
                        <SettingTabPaneItem
                            description={tab.description}
                            icon={tab.icon}
                            title={tab.title}
                        />
                    }
                >
                    <SettingContent
                        category={tab.category}
                        isDefault={tab.type === 'default'}
                        title={tab.title}
                    />
                </Tabs.TabPane>
            ))}
        </Tabs>
    );
}

export const SettingTabs = React.memo(SettingTabsPure);
