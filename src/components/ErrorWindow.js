import React from 'react';
import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react';

export const ErrorWindow = ({ children }) => {
    const [isShown, setIsShown] = useState(false);

    useEffect(() => {
        setIsShown(true);
        setTimeout(() => {
            setIsShown(false);
        }, 3000);
    }, []);

    return (
        ReactDOM.createPortal(
            <div className={isShown ? 'error-window show' : 'error-window'}>
                {children}
            </div>,
            document.body
        )
    );
};