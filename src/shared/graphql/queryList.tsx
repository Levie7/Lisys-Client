import { ErrorHandler } from '../utilities/errors';

export function queryList({
    skip,
    query,
    variables,
}: {
    skip?: boolean;
    query: any;
    variables?: any;
}) {
    let { data, fetchMore, loading } = query({
        onError(error: any) {
            ErrorHandler(error);
        },
        skip,
        variables,
        fetchPolicy: 'cache-and-network',
    });

    return {
        data,
        fetchMore,
        loading,
    };
}
