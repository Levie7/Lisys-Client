import React from 'react';

interface ErrorBoundaryProps {
    onError: (error: Error) => void;
    renderOnError: React.FC;
}
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, { hasError: boolean }> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(_: Error) {
        return { hasError: true };
    }

    componentDidCatch(error: Error) {
        this.props.onError(error);
    }

    render() {
        if (this.state.hasError) {
            return <this.props.renderOnError />;
        }
        return this.props.children;
    }
}
