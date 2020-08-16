export const createConfig = () => ({
    environment: process.env.NODE_ENV,
    graphqlServerUri:
        (process.env.NODE_ENV === 'development'
            ? process.env.LOCAL_GRAPHQL_SERVER_URI
            : process.env.REACT_APP_GRAPHQL_SERVER_URI) || '',
    loggerDsn: process.env.REACT_APP_LOGGER_DSN || '',
});
