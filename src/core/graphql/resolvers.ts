import { createCrudData } from './crud';
import { Crud } from './types';

export const resolvers = {
    Mutation: {
        updateCrud: (_: any, { payload }: { payload: Crud }, { cache }: { cache: any }) => {
            let data = { ...payload, __typename: 'Crud' };
            cache.writeData(createCrudData(data));

            return null;
        },
    },
};
