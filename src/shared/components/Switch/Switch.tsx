import { Switch as AntSwitch } from 'antd';
import { SwitchChangeEventHandler } from 'antd/lib/switch';
import * as React from 'react';

interface SwitchProps {
    defaultChecked?: boolean;

    handleChange?: SwitchChangeEventHandler;
}

function SwitchPure({ defaultChecked, handleChange }: SwitchProps) {
    return <AntSwitch defaultChecked={defaultChecked} onChange={handleChange} />;
}

export const Switch = React.memo(SwitchPure);
