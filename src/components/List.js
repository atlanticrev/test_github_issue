import React from 'react';

export const List = ({ className, itemsData, defaultItem, render }) => {
    if (itemsData.length) {
        return (
            <ul className={className}>
                {itemsData.map(itemData => render(itemData))}
            </ul>
        );
    } else {
        return defaultItem
            ? defaultItem
            : null;
    }
};