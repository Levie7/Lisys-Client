import { Input as AntInput } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import * as React from 'react';

interface InputAreaProps {
    disabled?: boolean;
    rows?: number;
}

export const InputArea = React.memo<InputAreaProps>(
    React.forwardRef(
        (
            { disabled, rows, ...props },
            ref?: string | ((instance: TextArea | null) => void) | React.RefObject<TextArea> | null
        ) => <AntInput.TextArea {...props} disabled={disabled} ref={ref} rows={rows} />
    )
);
