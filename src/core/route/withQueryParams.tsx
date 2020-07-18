import { parse } from 'qs';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

export function withQueryParams(WrappedComponent: any) {
    class WithQueryParams extends React.Component<RouteComponentProps<{}>> {
        render() {
            let search = this.props.location.search;
            let qs = search.startsWith('?') ? parse(search.substring(1)) : null;
            return <WrappedComponent {...this.props} query={qs} />;
        }
    }

    return withRouter(WithQueryParams) as any;
}
