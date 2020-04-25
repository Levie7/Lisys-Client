import { ErrorHandler } from '../utilities/errors';

export function queryForm({
    skip,
    query,
    variables,
}: {
    skip?: boolean;
    query: any;
    variables?: any;
}) {
    let { data, loading } = query({
        onError(error: any) {
            ErrorHandler(error);
        },
        skip,
        variables,
    });

    return {
        data,
        loading,
    };
}
