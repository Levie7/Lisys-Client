import { Menu } from 'src/core/api';
import { gql, useQuery } from 'src/core/graphql';

export const MENUS = gql`
    query {
        getMenus {
            children {
                icon
                id
                key
                name
                status
                url
            }
            icon
            id
            key
            name
            status
            url
        }
    }
`;

export const getMenus = (options: any) => useQuery<{ getMenus: Menu[] }>(MENUS, options);
