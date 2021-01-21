import React from 'react';

import { ListItem } from './ListItem';

export const List = ({ items }) => {
    if (items.length) {
        return (
            <ul className="list">
                {items.map(item => <ListItem key={item.id} itemInfo={item}/>)}
            </ul>
        );
    } else {
        return null;
    }
};