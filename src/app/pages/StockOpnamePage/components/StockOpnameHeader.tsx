import * as React from 'react';

import { Divider } from 'src/shared/components/Divider';

interface StockOpnameHeaderProps {
    date: string;
    no: string;
}

export const StockOpnameHeader = React.memo<StockOpnameHeaderProps>(({ date, no }) => (
    <>
        <div className='col-6'>
            <div className='row'>
                <div className='col-6'>
                    <h3>Transaction No</h3>
                </div>
                <div className='col-6'>: {no}</div>
            </div>
        </div>
        <div className='col-6'>
            <div className='row'>
                <div className='col-6'>
                    <h3>Date</h3>
                </div>
                <div className='col-6'>: {date}</div>
            </div>
        </div>
        <Divider />
    </>
));
