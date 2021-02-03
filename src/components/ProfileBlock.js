import React from 'react';

import { Avatar } from "./Avatar";

export const ProfileBlock = ({ img, link, userName }) => {
    return (
        <div className="profile-block">
            <Avatar className="profile-avatar" src={img} />
            <span className="profile-username">{userName}</span>
            <a className="profile-link" href={link} target="_blank">{link}</a>
        </div>
    );
};