import * as React from 'react';

import { InfoSetting } from 'src/modules/components/Settings/InfoSetting/InfoSetting';
import { RoleList } from 'src/modules/components/Settings/UserManagement/RoleList';
import { UserList } from 'src/modules/components/Settings/UserManagement/UserList';

import { Breadcrumb } from 'src/shared/components/Breadcrumb';
import { Button } from 'src/shared/components/Button';
import { Divider } from 'src/shared/components/Divider';
import { Form } from 'src/shared/components/Form';
import { Icon } from 'src/shared/components/Icon';

import { userManagementInfo } from './constants';

interface UserManagementState {
    activeSection: string;
}

export class UserManagement extends React.Component<{}, UserManagementState> {
    constructor(props: {}) {
        super(props);
        this.state = { activeSection: 'Main' };

        this.setSection = this.setSection.bind(this);
    }

    setSection(section: string) {
        this.setState({ activeSection: section });
    }

    renderContent() {
        let { activeSection } = this.state;

        switch (activeSection) {
            case 'Role':
                return <RoleList setSection={this.setSection} />;
            case 'Main':
                return this.renderMain();
            case 'User':
                return <UserList setSection={this.setSection} />;
            default:
                return null;
        }
    }

    renderMain() {
        return (
            <Form>
                <InfoSetting
                    description={userManagementInfo.role.description}
                    title={userManagementInfo.role.title}
                >
                    <div className='fw-bold mb-2'>Active Role (0)</div>
                    <Button
                        onClick={() => this.setSection(userManagementInfo.role.title)}
                        type='default'
                    >
                        Add or Modify Role
                    </Button>
                </InfoSetting>
                <InfoSetting
                    description={userManagementInfo.permission.description}
                    title={userManagementInfo.permission.title}
                >
                    <Button
                        onClick={() => this.setSection(userManagementInfo.permission.title)}
                        type='default'
                    >
                        Set Permission
                        <Icon type='lock' />
                    </Button>
                </InfoSetting>
                <InfoSetting
                    description={userManagementInfo.user.description}
                    title={userManagementInfo.user.title}
                >
                    <div className='fw-bold mb-2'>Active User (0)</div>
                    <Button
                        onClick={() => this.setSection(userManagementInfo.user.title)}
                        type='default'
                    >
                        Add or Modify User
                    </Button>
                </InfoSetting>
            </Form>
        );
    }

    render() {
        let { activeSection } = this.state;

        return (
            <>
                <Breadcrumb>
                    <Breadcrumb.Item href='/settings'>Settings</Breadcrumb.Item>
                    <Breadcrumb.Item>User Management</Breadcrumb.Item>
                    {activeSection !== 'Main' && <Breadcrumb.Item>{activeSection}</Breadcrumb.Item>}
                </Breadcrumb>
                {this.renderContent()}
                <Divider />
            </>
        );
    }
}
