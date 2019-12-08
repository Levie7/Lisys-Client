import React from 'react';

import { Card } from 'src/shared/components/Card';
import { Tabs, TabPositions } from 'src/shared/components/Tabs';
import { UIContext } from 'src/shared/contexts/UIContext';

import { tabData } from './constants';
import { CompanySetting } from './components/CompanySetting';
import { GeneralSetting } from './components/GeneralSetting';
import { UserSetting } from './components/UserSetting';

export class SettingPage extends React.Component<{}> {
    renderContent(tab: string) {
        switch (tab) {
            case 'Company':
                return <CompanySetting />;
            case 'General':
                return <GeneralSetting />;
            case 'User':
                return <UserSetting />;
            default:
                return null;
        }
    }

    renderTabs(position: TabPositions) {
        return (
            <Tabs defaultActiveKey='1' tabPosition={position}>
                {tabData.map((tab) => (
                    <Tabs.TabPane key={tab.key} tab={tab.title}>
                        {this.renderContent(tab.title)}
                    </Tabs.TabPane>
                ))}
            </Tabs>
        );
    }

    render() {
        return (
            <div className='d-flex fj-center m-4'>
                <Card>
                    <UIContext.Consumer>
                        {({ isMobile }) =>
                            isMobile ? this.renderTabs('top') : this.renderTabs('left')
                        }
                    </UIContext.Consumer>
                </Card>
            </div>
        );
    }
}
