import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { DropdownList } from "./DropdownList";

export const Input = (props) => {
    const [dropdownShow, setDropdownShow] = useState(false);
    const [dropdownItems, setDropdownItems] = useState([]);

    const inputEl = useRef();

    // Focus/Blur
    useEffect(() => {
        function onFocus () {
            console.log(props.dropdown, props.ownerValue);
            if (!props.dropdown || !props.ownerValue) {
                return;
            }
            fetch(`https://api.github.com/users/${props.ownerValue}/repos`)
                .then(response => {
                    if (!response.ok) {
                        // Go to catch block (is it correct?)
                        return false;
                    }
                    return response;
                })
                .then(response => response.json())
                .then(items => {
                    console.log(items);
                    setDropdownItems(items);
                    setDropdownShow(true);
                })
                .catch(err => {
                    console.error(err);
                });
        }
        function onBlur () {
            setDropdownShow(false);
        }
        inputEl.current.addEventListener('focus', onFocus);
        inputEl.current.addEventListener('blur', onBlur);
        return () => {
            inputEl.current.removeEventListener('focus', onFocus);
            inputEl.current.removeEventListener('blur', onBlur);
        };
    }, [props.ownerValue]);

    return (
        <div className="input-container">
            {props.isValid !== undefined && !props.isValid && <span className="input-error-msg">{props.errorMsg}</span>}
            <label className={props.isValid !== undefined && props.isValid ? 'input-label' : 'input-label error'}>
                <input
                    autoComplete="off"
                    type={props.type}
                    name={props.name}
                    placeholder={props.placeholder}
                    ref={inputEl}
                    value={props.value}
                    onChange={props.onChange}
                />
            </label>
            {props.dropdown && dropdownShow && <DropdownList items={dropdownItems}/>}
        </div>
    );
};