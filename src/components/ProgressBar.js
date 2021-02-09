import React from 'react';
import { useEffect, useState, useRef } from 'react';

export const ProgressBar = ({ isLoading }) => {
    const [progress, setProgress] = useState(0);

    const prevValue = useRef(progress);
    const intervalId = useRef(0);

    useEffect(() => {
        if (!isLoading) return;

        function intervalTick () {
            if (prevValue.current >= 100) {
                prevValue.current = 0;
                clearInterval(intervalId.current);
            }
            const newValue = prevValue.current + 0.1;
            prevValue.current = newValue;
            setProgress(newValue);
        }

        intervalId.current = setInterval(intervalTick);

        // Schedule clearing on next effect, right after next paint
        return () => {
            setProgress(100);
            prevValue.current = 0;
            clearInterval(intervalId.current);
        };
    }, [isLoading]);

    return (
        <div
            className={isLoading ? 'progress-bar show' : 'progress-bar'}
            style={{'--progress': `${progress}%`}}
        />
    );
};