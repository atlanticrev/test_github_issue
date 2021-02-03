import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { DropdownList } from "./DropdownList";

export const Input = (props) => {
    const [dropdownShow, setDropdownShow] = useState(false);
    const [dropdownItems, setDropdownItems] = useState([]);

    const inputEl = useRef();
    const prevOwnerValue = useRef();

    const getItems = () => {
        // let response = await fetch(`https://api.github.com/users/${props.ownerValue}/repos`);
        // if (!response.ok) {
        //     if (response.status === 404) {
        //         throw new Error('Owner is not found');
        //     } else {
        //         throw new Error('Error');
        //     }
        // }
        // let items = await response.json();
        // setDropdownItems(items);
        return new Promise((resolve, reject) => {
            fetch(`https://api.github.com/users/${props.ownerValue}/repos`)
                .then(response => {
                    if (!response.ok) {
                        if (response.status === 404) {
                            reject(new Error(`Repos of this ${props.ownerValue} is not found`));
                        } else {
                            reject(new Error('Error'));
                        }
                    }
                    return response;
                })
                .then(response => response.json())
                .then(items => {
                    resolve(items);
                    setDropdownItems(items);
                })
        });
    };

    useEffect(() => {
        const onFocus = () => {
            if (!props.needDropdown || !props.ownerValue) {
                return;
            }
            if (props.ownerValue !== prevOwnerValue.current) {
                prevOwnerValue.current = props.ownerValue;
                getItems()
                    .then(() => setDropdownShow(true))
                    .catch(err => console.log(err.message));
            } else {
                setDropdownShow(true);
            }
        }
        const onBlur = () => {
            setDropdownShow(false);
        }
        inputEl.current.addEventListener('focus', onFocus);
        inputEl.current.addEventListener('blur', onBlur);
        return () => {
            inputEl.current.removeEventListener('focus', onFocus);
            inputEl.current.removeEventListener('blur', onBlur);
        };
        // @todo learn more about dependencies
    }, [props.ownerValue]);

    const needShowError = props.isValid !== undefined && !props.isValid;

    return (
        <div className="input-container">
            {needShowError && <span className="input-error-msg">{props.errorMsg}</span>}
            <label className={needShowError ? 'input-label error' : 'input-label' }>
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
            {
                props.needDropdown && dropdownShow &&
                    <DropdownList
                        items={dropdownItems}
                        onSelect={props.onDropdownSelect}
                    />
            }
        </div>
    );
};