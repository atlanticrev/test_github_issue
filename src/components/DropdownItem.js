import React from 'react';

/**
 * @typedef {Object} DropdownItemData
 * @property {GithubProfile} user
 * @property {string} full_name
 * @property {string} name
 */

export const DropdownItem = ({ /** @type DropdownItemData */ itemData, onSelect }) => {
    return (
        <li className="dropdown-item" onMouseDown={(e) => onSelect(e, itemData.name)}>
            <span className="dropdown-item-name">{itemData.name}</span>
        </li>
    );
}