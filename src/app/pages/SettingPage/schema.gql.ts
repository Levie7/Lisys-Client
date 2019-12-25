import { gql, useQuery } from 'src/core/graphql';

const MOVIES = gql`
    {
        movies {
            mission_name
        }
    }
`;

export const useMovies = () => useQuery<{ movies: [{ mission_name: string }] }>(MOVIES);
