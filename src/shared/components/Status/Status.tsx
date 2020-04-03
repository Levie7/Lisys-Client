import * as React from 'react';

import { Badge } from 'src/shared/components/Badge';

interface StatusProps {
    text: any;
}

export const Status = React.memo<StatusProps>(({ text }) => {
    switch (text.status) {
        case 'Active':
            return <Badge status='success' text={text.status} />;
        case 'Inactive':
            return <Badge status='error' text={text.status} />;
        default:
            return null;
    }
});
