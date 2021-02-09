import React from 'react';
import { useState, useEffect } from 'react';

import { Input } from "./Input";
import { Button } from "./Button";

export const IssuesForm = ({ onSubmitted }) => {
    const owner = useFormField('');
    const repo = useFormField('');

    const checkValidityAndSubmit = () => {
        owner.value ? owner.setIsValid(true) : owner.setIsValid(false);
        repo.value ? repo.setIsValid(true) : repo.setIsValid(false);
        if (owner.value && repo.value) {
            onSubmitted && onSubmitted(owner.value, repo.value);
        }
    };

    const dropdownSelection = useSelected(false, checkValidityAndSubmit);

    const onDropdownSelect = (e, value) => {
        repo.onValueChange(e, value);
        dropdownSelection.onSelect();
    };

    const onSubmit = (e) => {
        e.preventDefault();
        checkValidityAndSubmit();
    }

    return (
        <form>
            <Input
                type="text"
                name="owner"
                placeholder="Owner"
                value={owner.value}
                onChange={owner.onValueChange}
                isValid={owner.isValid}
                errorMsg="Fill the owner field"
            />
            <Input
                type="text"
                name="repo"
                placeholder="Repository"
                value={repo.value}
                ownerValue={owner.value} // value from another form field
                onChange={repo.onValueChange}
                isValid={repo.isValid}
                errorMsg="Fill the repository field"
                needDropdown={true}
                onDropdownSelect={onDropdownSelect}
            />
            <Button onClick={onSubmit}>Search</Button>
        </form>
    );
};

/**
 *
 * @param initValue
 * @returns {{setIsValid: function, onValueChange: function, isValid: boolean, value: string}}
 */
const useFormField = (initValue = '') => {
    const [value, setValue] = useState(initValue);
    const [isValid, setIsValid] = useState(true);
    const onValueChange = (e, value = null) => {
        setIsValid(true);
        // checks for value and target.value
        setValue(value || e.target.value);
    };
    return {
        value,
        isValid,
        setIsValid,
        onValueChange
    };
};

/**
 * @param {boolean} initValue
 * @param {function} onSelected
 * @returns {{onSelect: function}}
 */
const useSelected = (initValue = false, onSelected = () => {}) => {
    const [isSelected, setIsSelected] = useState(initValue);
    const onSelect = () => {
        setIsSelected(true);
    };
    useEffect(() => {
        if (isSelected) {
            setIsSelected(false);
            onSelected();
        }
    }, [isSelected]);
    return {
        onSelect
    };
};