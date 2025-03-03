"use client";
import React, { Component, ReactNode } from "react";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(): State {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error("Error caught by Error Boundary:", error, errorInfo);
    }

    resetError = () => {
        this.setState({ hasError: false });
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex flex-col items-center justify-center min-h-screen bg-gray-300 p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-red-600">😢 Oops! Something went wrong.</h2>
                    <p className="text-gray-700 mt-2">We&#39;re sorry for the inconvenience. Please try again.</p>
                    <button
                        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                        onClick={this.resetError}>
                        Try Again
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
