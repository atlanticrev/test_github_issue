import React from 'react';
import { useEffect, useRef } from 'react';

export const ProgressBar = ({ progress, setProgress }) => {
    const prevValue = useRef(progress);
    const intervalId = useRef(progress);

    function intervalTick () {
        if (prevValue.current >= 100) {
            clearInterval(intervalId.current);
        }
        const newValue = prevValue.current + 0.1;
        setProgress(newValue);
        prevValue.current = newValue;
    }

    useEffect(() => {
        intervalId.current = setInterval(intervalTick);
        return () => clearInterval(intervalId.current);
    }, []);

    return (
        <div className="progress-bar" style={{'--progress': `${progress}%`}} />
    );
};