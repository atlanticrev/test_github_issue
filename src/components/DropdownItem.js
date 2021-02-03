import React from 'react';

export const DropdownItem = ({ /** @type DropdownItemInfo */ itemInfo, onSelect }) => {
    return (
        <li className="dropdown-item" onMouseDown={(e) => onSelect(e, itemInfo.name)}>
            <span className="dropdown-item-name">{itemInfo.name}</span>
        </li>
    );
}