import React from 'react';

import { DropdownItem } from "./DropdownItem";

export const DropdownList = ({ items, onSelect }) => {
    if (items.length) {
        return (
            <ul className="dropdown-list">
                {items.map(item =>
                    <DropdownItem
                        key={item.id}
                        itemInfo={item}
                        onSelect={onSelect}
                    />)
                }
            </ul>
        );
    } else {
        return null;
    }
};