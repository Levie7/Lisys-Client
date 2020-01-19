import * as React from 'react';

export const Footer = React.memo(() => (
    <div className='bg-primary fg-white p-6 ta-center'>
        Copyright © 2019 - Company. All Right Reserved.
        <br />
        made with{' '}
        <span role='img' aria-label='Heart'>
            ❤️
        </span>{' '}
        by Lisys
    </div>
));
