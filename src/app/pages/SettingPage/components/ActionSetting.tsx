import * as React from 'react';

import { Button } from 'src/shared/components/Button';

export class ActionSetting extends React.Component<{}> {
    render() {
        return (
            <div className='d-flex fj-end'>
                <Button type='primary'>Save</Button>
            </div>
        );
    }
}
