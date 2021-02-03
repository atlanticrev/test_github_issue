import React from 'react';
import { useEffect, useState, useRef } from 'react';

export const ProgressBar = ({ isLoading }) => {
    const [progress, setProgress] = useState(0);

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

    // @todo how it works?
    useEffect(() => {
        if (isLoading) {
            intervalId.current = setInterval(intervalTick);
            return () => {
                setProgress(100);
                clearInterval(intervalId.current);
            };
        }
    }, [isLoading]);

    return (
        <div className={isLoading ? 'progress-bar show' : 'progress-bar'} style={{'--progress': `${progress}%`}} />
    );
};