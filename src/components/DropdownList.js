import React from 'react';

import { DropdownItem } from "./DropdownItem";

export const DropdownList = ({ items }) => {
    if (items.length) {
        return (
            <ul className="dropdown-list">
                {items.map(item => <DropdownItem key={item.id} itemInfo={item}/>)}
            </ul>
        );
    } else {
        return null;
    }
};