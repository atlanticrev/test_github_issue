import React from 'react';

export const DropdownItem = ({ /** @type DropdownItemInfo */ itemInfo }) => {
    return (
        <li className="dropdown-item">
            <span className="dropdown-item-name">{itemInfo.name}</span>
        </li>
    );
}