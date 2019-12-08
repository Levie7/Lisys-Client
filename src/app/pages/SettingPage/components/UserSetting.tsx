import * as React from 'react';

import { Divider } from 'src/shared/components/Divider';
import { Table } from 'src/shared/components/Table';

import { userColumn, userData } from '../constants';
import { ActionSetting } from './ActionSetting';

export class UserSetting extends React.Component<{}> {
    render() {
        return (
            <>
                <Divider orientation='left'>User Information</Divider>
                <Table columns={userColumn} dataSource={userData} />
                <Divider />
                <ActionSetting />
            </>
        );
    }
}
