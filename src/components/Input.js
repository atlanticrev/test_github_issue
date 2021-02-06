import React from 'react';
import { useState, useEffect, useRef } from 'react';

import { List } from "./List";
import { DropdownItem } from "./DropdownItem";

export const Input = (props) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [dropdownItems, setDropdownItems] = useState([]);

    const inputEl = useRef();
    const prevOwnerValue = useRef();

    /**
     * @returns {Promise<Array<DropdownItemData>>}
     */
    const getItems = () => {
        return new Promise((resolve, reject) => {
            fetch(`https://api.github.com/users/${props.ownerValue}/repos`)
                .then(response => {
                    if (!response.ok) {
                        if (response.status === 404) {
                            reject(new Error(`Repos of the ${props.ownerValue} are not found`));
                        } else {
                            reject(new Error('Error'));
                        }
                    }
                    return response;
                })
                .then(response => response.json())
                .then(items => resolve(items));
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
                    .then(items => {
                        setDropdownItems(items);
                        setShowDropdown(true);
                    })
                    .catch(err => console.log(err.message));
            } else {
                setShowDropdown(true);
            }
        }

        const onBlur = () => {
            setShowDropdown(false);
        }

        inputEl.current.addEventListener('focus', onFocus);
        inputEl.current.addEventListener('blur', onBlur);

        return () => {
            inputEl.current.removeEventListener('focus', onFocus);
            inputEl.current.removeEventListener('blur', onBlur);
        };
    });

    /** @type Boolean */
    const needShowError = props.isValid !== undefined && !props.isValid;

    const dropdown = props.needDropdown ? (
        <List
            className="dropdown-list"
            itemsData={dropdownItems}
            render={dropdownItem =>
                <DropdownItem
                    key={dropdownItem.id}
                    itemData={dropdownItem}
                    onSelect={props.onDropdownSelect}
                />
            }
            defaultItem={true}
        />
    ) : null;

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
            {showDropdown && dropdown}
        </div>
    );
};