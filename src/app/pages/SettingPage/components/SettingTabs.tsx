import * as React from 'react';

import { Lang } from 'src/core/api';

import { TabPositions, Tabs } from 'src/shared/components/Tabs';

import { tabData } from '../constants';
import { SettingContent } from './SettingContent';
import { SettingTabPaneItem } from './SettingTabPaneItem';

interface SettingTabsProps extends Lang {
    position: TabPositions;
}

function SettingTabsPure({ lang, position }: SettingTabsProps) {
    return (
        <Tabs defaultActiveKey='3' tabPosition={position}>
            {tabData.map((tab) => (
                <Tabs.TabPane
                    key={tab.key}
                    tab={
                        <SettingTabPaneItem
                            description={tab.description[lang]}
                            icon={tab.icon}
                            title={tab.title[lang]}
                        />
                    }
                >
                    <SettingContent
                        category={tab.category}
                        lang={lang}
                        isDefault={tab.type === 'default'}
                        title={tab.title[lang]}
                    />
                </Tabs.TabPane>
            ))}
        </Tabs>
    );
}

export const SettingTabs = React.memo(SettingTabsPure);
