import React from 'react';
import { useEffect, useRef } from 'react';

export const Input = (props) => {
    const inputEl = useRef();

    // Focus/Blur
    useEffect(() => {
        function onFocus () {
            // console.log('focused');
        }
        function onBlur () {
            // console.log('blurred');
        }
        inputEl.current.addEventListener('focus', onFocus);
        inputEl.current.addEventListener('blur', onBlur);
        return () => {
            inputEl.current.removeEventListener('focus', onFocus);
            inputEl.current.removeEventListener('blur', onBlur);
        };
    }, []);

    return (
        <div className="input-container">
            {props.isValid !== undefined && !props.isValid && <span className="input-error-msg">{props.errorMsg}</span>}
            <label className={props.isValid !== undefined && props.isValid ? 'input-label' : 'input-label error'}>
                <input
                    type={props.type}
                    name={props.name}
                    placeholder={props.placeholder}
                    ref={inputEl}
                    value={props.value}
                    onChange={props.onChange}
                />
            </label>
        </div>
    );
};