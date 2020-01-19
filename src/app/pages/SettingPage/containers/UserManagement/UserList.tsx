import * as React from 'react';

import { Button } from 'src/shared/components/Button';
import { Divider } from 'src/shared/components/Divider';
import { Icon } from 'src/shared/components/Icon';
import { Table } from 'src/shared/components/Table';

import { userColumn, userData } from './constants';

interface UserListProps {
    setSection: (section: string) => void;
}

export class UserList extends React.Component<UserListProps> {
    render() {
        let { setSection } = this.props;

        return (
            <>
                <Divider />
                <div className='d-flex fj-between mb-4'>
                    <Button onClick={() => setSection('Main')} type='default'>
                        <Icon type='left' /> Back
                    </Button>
                    <Button type='primary'>
                        <Icon type='plus' /> Add
                    </Button>
                </div>
                <Table columns={userColumn} dataSource={userData} />
            </>
        );
    }
}
