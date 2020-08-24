import { Switch as AntSwitch } from 'antd';
import { SwitchChangeEventHandler } from 'antd/lib/switch';
import * as React from 'react';

interface SwitchProps {
    checkedChildren?: React.ReactNode;
    defaultChecked?: boolean;
    unCheckedChildren?: React.ReactNode;

    handleChange?: SwitchChangeEventHandler;
}

function SwitchPure({
    checkedChildren,
    defaultChecked,
    handleChange,
    unCheckedChildren,
}: SwitchProps) {
    return (
        <AntSwitch
            checkedChildren={checkedChildren}
            defaultChecked={defaultChecked}
            onChange={handleChange}
            unCheckedChildren={unCheckedChildren}
        />
    );
}

export const Switch = React.memo(SwitchPure);
