import React from 'react';
import ReactDOM from 'react-dom';
import { useState, useEffect, useRef } from 'react';

const ERROR_VIEW_DURATION = 3000;

export const ErrorWindow = ({ children, setShowError }) => {
    const animation = useAnimation(() => setShowError(false));

    return (
        ReactDOM.createPortal(
            <div
                className={animation.showClassIsSet ? 'error-window show' : 'error-window'}
                ref={animation.ref}
            >
                {children}
            </div>,
            document.body
        )
    );
};

const useAnimation = (onFinish) => {
    const [showClassIsSet, setShowClassIsSet] = useState(false);

    const ref = useRef();

    useEffect(() => {
        const onTransitionStart = () => {
            // waiting for the right calculated initial styles
            requestAnimationFrame(() => {
                setShowClassIsSet(true);
            });
        };

        const onTransitionEnd = () => {
            ref.current.removeEventListener('transitionend', onTransitionEnd);
            onFinish();
        }

        // Start swipe-in animation
        onTransitionStart();

        // Schedule swipe-out animation
        setTimeout(() => {
            ref.current.addEventListener('transitionend', onTransitionEnd);
            setShowClassIsSet(false);
        }, ERROR_VIEW_DURATION);
    }, []);

    return {
        showClassIsSet,
        ref
    };
};