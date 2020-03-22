import { Input as AntInput } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import * as React from 'react';

interface InputProps {
    rows?: number;
}

export const InputArea = React.memo<InputProps>(
    React.forwardRef(
        (
            { rows, ...props },
            ref?: string | ((instance: TextArea | null) => void) | React.RefObject<TextArea> | null
        ) => <AntInput.TextArea {...props} ref={ref} rows={rows} />
    )
);
