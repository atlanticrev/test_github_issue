import React from 'react';
import ReactDOM from 'react-dom';
import { useState, useEffect, useRef } from 'react';

export const ErrorWindow = ({ children, showError }) => {
    const [isShown, setIsShown] = useState(false);

    const ref = useRef();

    function onTransitionEnd () {
        ref.current.removeEventListener('transitionend', onTransitionEnd);
        showError(false);
    }

    useEffect(() => {
        // wait for base styles
        requestAnimationFrame(() => setIsShown(true));
        setTimeout(() => {
            ref.current.addEventListener('transitionend', onTransitionEnd);
            setIsShown(false);
        }, 3000);
    }, []);

    return (
        ReactDOM.createPortal(
            <div
                ref={ref}
                className={isShown ? 'error-window show' : 'error-window'}
            >
                {children}
            </div>,
            document.body
        )
    );
};