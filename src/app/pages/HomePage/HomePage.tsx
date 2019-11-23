import React from 'react';
import { Button } from 'antd';

export const HomePage = () => (
    <div className='HomePage'>
        <header className='HomePage-header'>
            <p>
                Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <a
                className='HomePage-link'
                href='https://reactjs.org'
                target='_blank'
                rel='noopener noreferrer'
            >
                Learn React
                <Button type='primary'>Yeah</Button>
            </a>
        </header>
    </div>
);
