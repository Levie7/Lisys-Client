import React from 'react';

import { Card } from 'src/shared/components/Card';
import { Icon } from 'src/shared/components/Icon';
import { Tabs, TabPositions } from 'src/shared/components/Tabs';
import { UIContext } from 'src/shared/contexts/UIContext';

import { TabPaneItemSetting } from './components/TabPaneItemSetting';
import { tabData } from './constants';
import { Company } from './containers/Company/Company';
import { General } from './containers/General/General';
import { UserManagement } from './containers/UserManagement';

export default function SettingPage() {
    function renderContent(tab: string) {
        switch (tab) {
            case 'Company':
                return <Company />;
            case 'General':
                return <General />;
            case 'User Management':
                return <UserManagement />;
            default:
                return null;
        }
    }

    function renderTabs(position: TabPositions) {
        return (
            <Tabs defaultActiveKey='3' tabPosition={position}>
                {tabData.map((tab) => (
                    <Tabs.TabPane
                        key={tab.key}
                        tab={
                            <TabPaneItemSetting
                                description={tab.description}
                                icon={tab.icon}
                                title={tab.title}
                            />
                        }
                    >
                        {renderContent(tab.title)}
                    </Tabs.TabPane>
                ))}
            </Tabs>
        );
    }

    return (
        <div className='d-flex fj-center m-4'>
            <Card>
                <UIContext.Consumer>
                    {({ isMobile }) => (isMobile ? renderTabs('top') : renderTabs('left'))}
                </UIContext.Consumer>
            </Card>
        </div>
    );
}
