import React from 'react';

import { LoadingComponent } from 'src/core/chunk';

import { Spin } from 'src/shared/components/Spin';

export const PageLoading: LoadingComponent = ({ error }, props) => {
    if (error) {
        throw error;
    }
    return <Spin spinning={true}>{props.children}</Spin>;
};
