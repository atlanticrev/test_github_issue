import React from 'react';

export const ListItem = ({ itemInfo }) => {
    return (
        <li className="list-item">
            <h2>{itemInfo.title}</h2>
            <p>{itemInfo.number}</p>
            <address>{itemInfo.created_at}</address>
        </li>
    );
};