import React from 'react';
import Loadable from 'react-loadable';

const Loading = () => React.createElement('div');

export type LoadingComponent = React.FC<Loadable.LoadingComponentProps>;

export const suspend = ({
    component,
    renderWhileLoading,
}: {
    component: () => Promise<any>;
    renderWhileLoading?: LoadingComponent;
}) =>
    Loadable({
        loader: component,
        loading: renderWhileLoading || Loading,
    });
