import React from 'react';
import ReactDOM from 'react-dom';
import { useState, useEffect, useRef } from 'react';

const ERROR_VIEW_DURATION = 3000;

export const ErrorWindow = ({ children, showError }) => {
    const [isShown, setIsShown] = useState(false);

    const ref = useRef();

    function onTransitionEnd () {
        ref.current.removeEventListener('transitionend', onTransitionEnd);
        showError(false);
    }

    useEffect(() => {
        // get styles calculated on last async task
        requestAnimationFrame(() => setIsShown(true));
        setTimeout(() => {
            ref.current.addEventListener('transitionend', onTransitionEnd);
            setIsShown(false);
        }, ERROR_VIEW_DURATION);
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