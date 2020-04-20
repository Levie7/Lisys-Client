import { ErrorHandler } from '../utilities/errors';

export function queryForm(query: any, variables?: any) {
    let { data, loading } = query({
        onError(error: any) {
            ErrorHandler(error);
        },
        variables,
    });

    return {
        data,
        loading,
    };
}
