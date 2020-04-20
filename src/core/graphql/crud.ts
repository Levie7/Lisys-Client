import { Crud } from './types';
import { gql, useQuery, useMutation } from './core';

export const createCrudData = (Crud: any) => ({
    data: {
        getCrud: Crud,
    },
});

export const createCrudModule = () => {
    const initialData: Crud = {
        action: 'list',
        section: 'main',
        __typename: 'Crud',
    };

    return {
        onInitCache: (cache: any) => cache.writeData(createCrudData(initialData)),
    };
};

const CRUD = gql`
    query getCrud {
        getCrud @client {
            action
            section
        }
    }
`;
const getCrud = () => useQuery<{ getCrud: Crud }>(CRUD);

export const updateCrud = () =>
    useMutation<{ updateCrud: Crud }>(gql`
        mutation updateCrud($payload: UpdateCrudPayload) {
            updateCrud(payload: $payload) @client
        }
    `);

export const useCrud = () => {
    let { data } = getCrud();
    return data!.getCrud;
};
