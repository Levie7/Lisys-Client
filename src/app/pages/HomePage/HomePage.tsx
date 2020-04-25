import React from 'react';
import { updateCrud, useCrud } from 'src/core/graphql/crud';

export const HomePage = () => {
    let crud = useCrud();
    let [fetch, { loading, error }] = updateCrud();
    if (loading || error) return null;

    function handleToggle() {
        fetch({
            variables: { payload: { action: 'list', section: 'main' } },
        });
    }

    return (
        <div className='HomePage' style={{ margin: '24px 16px 0' }}>
            <header className='HomePage-header'>Home Page</header>
            <button onClick={handleToggle}>Home Main</button>
            <div>{crud?.action}</div>
            <div>{crud?.section}</div>
        </div>
    );
};
