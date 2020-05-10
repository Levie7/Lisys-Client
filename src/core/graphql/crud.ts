import { gql, useQuery, useMutation } from './core';
import { Crud } from './types';

export const createCrudData = (Crud: any) => ({
    data: {
        getCrud: Crud,
    },
});

export const createCrudModule = () => {
    const initialData: Crud = {
        action: 'back',
        section: 'main',
        __typename: 'Crud',
    };

    return {
        onInitCache: (cache: any) => cache.writeData(createCrudData(initialData)),
    };
};

export const CRUD = gql`
    query getCrud {
        getCrud @client {
            action
            section
        }
    }
`;
const getCrud = () => useQuery<{ getCrud: Crud }>(CRUD);

export const UPDATE_CRUD = gql`
    mutation updateCrud($payload: UpdateCrudPayload) {
        updateCrud(payload: $payload) @client {
            action
            section
        }
    }
`;

export const updateCrud = () => useMutation<{ updateCrud: Crud }>(UPDATE_CRUD);

export const useCrud = () => {
    let { data } = getCrud();
    return data!.getCrud;
};
