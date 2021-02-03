import React from 'react';

import { ListItem } from './ListItem';

export const List = ({ items }) => {
    if (items.length) {
        return (
            <ul className="list">
                {items.map(item => <ListItem key={item.id} data={item}/>)}
            </ul>
        );
    } else {
        return (
            <ul className="list">
                <li className="list-item">
                    <h2>There are no issues</h2>
                </li>
            </ul>
        );
    }
};