import { init, captureException } from '@sentry/browser';

export const createLogger = ({
    environment,
    dsn,
}: {
    environment: 'development' | 'production' | 'test';
    dsn: string;
}) => {
    init({
        dsn,
        environment,
    });

    return {
        error: sentryErrorLogger,
    };
};

const sentryErrorLogger = (error: Error) => {
    if (error) {
        captureException(error);
    }
};
