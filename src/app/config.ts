export const createConfig = () => ({
    environment: process.env.NODE_ENV,
    graphqlServerUri:
        (process.env.NODE_ENV === 'development'
            ? 'http://localhost:4000/graphql'
            : process.env.REACT_APP_GRAPHQL_SERVER_URI) || '',
    loggerDsn: process.env.REACT_APP_LOGGER_DSN || '',
});
