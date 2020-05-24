import { ErrorHandler } from '../utilities/errors';

export function queryList({
    query,
    skip,
    variables,
}: {
    query: any;
    skip?: boolean;
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
