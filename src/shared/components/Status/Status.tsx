import * as React from 'react';

import { Badge } from 'src/shared/components/Badge';
import { Capitalized } from 'src/shared/utilities/capitalized';

interface StatusProps {
    text: any;
}

function StatusPure({ text }: StatusProps) {
    switch (text.status) {
        case 'active':
            return <Badge status='success' text={Capitalized(text.status)} />;
        case 'inactive':
            return <Badge status='error' text={Capitalized(text.status)} />;
        default:
            return null;
    }
}

export const Status = React.memo(StatusPure);
