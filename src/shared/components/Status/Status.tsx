import * as React from 'react';

import { Badge } from 'src/shared/components/Badge';
import { Capitalized } from 'src/shared/utilities/capitalized';

interface StatusProps {
    text: any;
}

export const Status = React.memo<StatusProps>(({ text }) => {
    switch (text.status) {
        case 'active':
            return <Badge status='success' text={Capitalized(text.status)} />;
        case 'inactive':
            return <Badge status='error' text={Capitalized(text.status)} />;
        default:
            return null;
    }
});
