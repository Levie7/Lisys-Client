import * as React from 'react';

import { Button } from 'src/shared/components/Button';
import { Divider } from 'src/shared/components/Divider';
import { Icon } from 'src/shared/components/Icon';
import { Table } from 'src/shared/components/Table';

import { roleColumn, roleData } from './constants';

interface RoleListProps {
    setSection: (section: string) => void;
}

export class RoleList extends React.Component<RoleListProps> {
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
                <Table columns={roleColumn} dataSource={roleData} />
            </>
        );
    }
}
