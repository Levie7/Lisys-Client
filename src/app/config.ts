export const createConfig = () => ({
    environment: process.env.NODE_ENV,
    graphqlServerUri: process.env.REACT_APP_GRAPHQL_SERVER_URI || '',
    loggerDsn: process.env.REACT_APP_LOGGER_DSN || '',
});
