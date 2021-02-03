import React from 'react';

export const Avatar = ({ src, className }) => {
    return (
        <div className={className}>
            <img src={src} alt="avatar" />
        </div>
    );
};