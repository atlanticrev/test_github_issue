import React from 'react';

export const ListItem = ({ /** @type itemInfo */ itemInfo }) => {
    return (
        <li className="list-item">
            <h2 className="list-item-title">{itemInfo.title}</h2>
            <p className="list-item-number"># {itemInfo.number.toString()}</p>
            <address className="list-item-date">{new Date(itemInfo.created_at).toLocaleDateString()}</address>
        </li>
    );
};