import React from 'react';

export const List = ({ className, itemsData, defaultItem, render }) => {
    if (itemsData.length) {
        return (
            <ul className={className}>
                {itemsData.map(itemData => render(itemData))}
            </ul>
        );
    } else {
        return defaultItem ? (
            // @todo use default item form props
            <ul className={className}>
                <li className="list-item">
                    <h2>There are no issues</h2>
                </li>
            </ul>
        ) : null;
    }
};