import * as React from 'react';

import { Divider } from 'src/shared/components/Divider';

import { ActionSetting } from './ActionSetting';

export class GeneralSetting extends React.Component<{}> {
    render() {
        return (
            <>
                <Divider orientation='left'>General Information</Divider>
                <Divider />
                <ActionSetting />
            </>
        );
    }
}
