import * as React from 'react';

import { Capitalized } from '../utilities/capitalized';
import { ErrorHandler } from '../utilities/errors';
import { Message } from '../utilities/message';
import { Progress } from '../utilities/progress';

export function mutationForm({
    formType,
    mutations,
    resetForm,
}: {
    formType: string;
    mutations: any;
    resetForm?: () => void;
}) {
    let [fetchUser, { loading }] = mutations({
        onCompleted() {
            Progress(false);
            resetForm && formType === 'create' && resetForm();

            return <>{Message(`${Capitalized(formType)} data successfully`, 'success')}</>;
        },
        onError(mutationError: any) {
            Progress(false);
            ErrorHandler(mutationError);
        },
    });

    return {
        action: fetchUser,
        loading,
    };
}
