import React from 'react';
import { useEffect, useState, useRef } from 'react';

export const ProgressBar = ({ isLoading }) => {
    const [progress, setProgress] = useState(0);

    const prevValue = useRef(progress);
    const intervalId = useRef(0);

    useEffect(() => {
        function intervalTick () {
            if (prevValue.current >= 100) {
                prevValue.current = 0;
                clearInterval(intervalId.current);
            }
            const newValue = prevValue.current + 0.1;
            prevValue.current = newValue;
            setProgress(newValue);
        }

        // Do it only when we start loading
        if (isLoading) {
            intervalId.current = setInterval(intervalTick);
            // Schedule this function call on next effect call, right after next paint
            return () => {
                setProgress(100);
                prevValue.current = 0;
                clearInterval(intervalId.current);
            };
        }
    }, [isLoading]);

    // const [loading, setLoading] = useState(isLoading);

    // useEffect(() => {
    {/*    console.log('trigger effect');*/}

    //     // Do it only when we start loading
    //     let intervalId = null;
    //     if (isLoading) {
    //         intervalId = setInterval(() => {
    //             setProgress(prevProgress => {
    {/*                console.log('progress:', prevProgress);*/}
    //                 if (prevProgress >= 100) {
    //                     setLoading(false);
    //                     return 100;
    //                 }
    //                 return prevProgress + 0.1;
    //             });
    //         });
    //     }
    //
    //     // Schedule this function call on next effect call, right after next paint
    //     return () => {
    //         console.log('clear effect');
    //         clearInterval(intervalId);
    //     };
    // }, [isLoading]);

    return (
        <div
            className={isLoading ? 'progress-bar show' : 'progress-bar'}
            // className={'progress-bar show'}
            style={{'--progress': `${progress}%`}}
        />
    );
};