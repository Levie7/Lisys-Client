import React from 'react';

import { Company } from 'src/modules/components/Settings/Company/Company';
import { General } from 'src/modules/components/Settings/General/General';
import { UserManagement } from 'src/modules/components/Settings/UserManagement';

import { Card } from 'src/shared/components/Card';
import { Icon } from 'src/shared/components/Icon';
import { Tabs, TabPositions } from 'src/shared/components/Tabs';
import { UIContext } from 'src/shared/contexts/UIContext';

import { tabData } from './constants';

export class SettingPage extends React.Component<{}> {
    renderContent(tab: string) {
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

    renderTabs(position: TabPositions) {
        return (
            <Tabs defaultActiveKey='2' tabPosition={position}>
                {tabData.map((tab) => (
                    <Tabs.TabPane
                        key={tab.key}
                        tab={
                            <div className='d-flex fd-row'>
                                <Icon className='d-flex fa-center' type={tab.icon} />
                                <div>
                                    <div className='fw-bold'>{tab.title}</div>
                                    <UIContext.Consumer>
                                        {({ isMobile }) =>
                                            !isMobile && (
                                                <div className='fg-gray-light'>
                                                    {tab.description}
                                                </div>
                                            )
                                        }
                                    </UIContext.Consumer>
                                </div>
                            </div>
                        }
                    >
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
