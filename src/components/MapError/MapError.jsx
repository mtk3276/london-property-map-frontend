import React from 'react';
import './MapError.css';

const MapError = ({ error, onRetry }) => {
    const getErrorMessage = (error) => {
        if (error.includes('timeout')) {
            return {
                title: "Connection Timeout",
                message: "The server is taking longer than expected to respond. This might be due to high traffic or server maintenance.",
                suggestion: "Please try again in a moment."
            };
        } else if (error.includes('500')) {
            return {
                title: "Server Error",
                message: "We're experiencing technical difficulties on our end.",
                suggestion: "Our team has been notified. Please try again later."
            };
        } else if (error.includes('Network Error') || error.includes('ERR_NETWORK')) {
            return {
                title: "Connection Problem",
                message: "Unable to connect to our servers. Please check your internet connection.",
                suggestion: "Make sure you're connected to the internet and try again."
            };
        } else {
            return {
                title: "Something went wrong",
                message: "We encountered an unexpected error while loading the map data.",
                suggestion: "Please try refreshing the page or contact support if the problem persists."
            };
        }
    };

    const errorInfo = getErrorMessage(error);

    return (
        <div className="map-error">
            <div className="map-error__container blurred__white__bg">
                <div className="map-error__content">
                    <h2 className="map-error__title">{errorInfo.title}</h2>
                    
                    <p className="map-error__message">{errorInfo.message}</p>
                    
                    <p className="map-error__suggestion">{errorInfo.suggestion}</p>
                    
                    <div className="map-error__actions">
                        <button 
                            className="map-error__retry-btn"
                            onClick={onRetry}
                        >
                            <span className="btn__line" data-text="Try Again">Try Again</span>
                        </button>
                        
                        <button 
                            className="map-error__home-btn"
                            onClick={() => window.location.href = '/'}
                        >
                            <span className="btn__line" data-text="Go Home">Go Home</span>
                        </button>
                    </div>
                    
                    {/* <div className="map-error__details">
                        <details>
                            <summary>Technical Details</summary>
                            <code>{error}</code>
                        </details>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default MapError;
