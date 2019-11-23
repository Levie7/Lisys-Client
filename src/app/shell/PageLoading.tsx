import React from 'react';

import { LoadingComponent } from 'src/core/chunk';

export const PageLoading: LoadingComponent = ({ error }) => {
    if (error) {
        throw error;
    }
    return <div>Page is loading...</div>;
};
