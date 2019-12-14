import * as React from 'react';

import { Divider } from 'src/shared/components/Divider';

interface InfoSettingProps {
    description?: string;
    title?: string;
}

export class InfoSetting extends React.Component<InfoSettingProps> {
    render() {
        let { children, description, title } = this.props;

        return (
            <>
                <Divider />
                <div className='d-flex fd-column fd@md-row'>
                    <div className='col-12 col@md-4 mb-4'>
                        <h1 className='fw-bold'>{title}</h1>
                        {description}
                    </div>
                    <div className='col-12 col@md-4'>{children}</div>
                </div>
            </>
        );
    }
}
