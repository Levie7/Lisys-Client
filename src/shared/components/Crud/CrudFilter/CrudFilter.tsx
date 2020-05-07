import * as React from 'react';

import { Search } from 'src/shared/components/Input';
import { useUIContext } from 'src/shared/contexts/UIContext';

interface CrudFilterProps extends React.HTMLAttributes<any> {
    onSearch?: (value: any) => void;
}

function CrudFilterPure({ className, onSearch }: CrudFilterProps) {
    let isMobile = useUIContext().isMobile;

    return (
        <div id='CrudFilter' className='mb-2 d-flex fj-between'>
            <div className='d-flex d-invisible'>Filter</div>
            <Search
                className={isMobile ? 'w-100' : 'w-25'}
                id='Search'
                onSearch={onSearch}
                placeholder='Search'
            />
        </div>
    );
}

export const CrudFilter = React.memo(CrudFilterPure);
