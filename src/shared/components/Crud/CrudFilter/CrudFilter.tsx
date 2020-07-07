import * as React from 'react';

import { Search } from 'src/shared/components/Input';
import { useUIContext } from 'src/shared/contexts/UIContext';
import { classNames } from 'src/shared/utilities/classNames';

interface CrudFilterProps extends React.HTMLAttributes<any> {
    customFilter?: React.ReactNode;
    showSearch?: boolean;

    onSearch?: (value: any) => void;
}

function CrudFilterPure({ className, customFilter, onSearch, showSearch }: CrudFilterProps) {
    let isMobile = useUIContext().isMobile;

    return (
        <div
            id='CrudFilter'
            className={classNames('mb-2 d-flex fj-between', isMobile ? 'fd-column' : '')}
        >
            {customFilter ? customFilter : <div className='d-flex d-invisible'>Filter</div>}
            {showSearch && (
                <Search
                    className={isMobile ? 'mt-2 w-100' : 'w-25'}
                    id='Search'
                    onSearch={onSearch}
                    placeholder='Search'
                />
            )}
        </div>
    );
}

export const CrudFilter = React.memo(CrudFilterPure);
