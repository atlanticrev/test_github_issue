import React from 'react';
import { ProfileBlock } from "./ProfileBlock";

export const ListItem = ({ /** @type ItemInfo */ data }) => {
    return (
        <li className="list-item">
            <ProfileBlock
                img={data.user.avatar_url}
                link={data.user.html_url}
                userName={data.user.login}
            />
            <div className="issue-description">
                <h2 className="list-item-title">{data.title}</h2>
                <p className="list-item-number">No. {data.number.toString()}</p>
                <address className="list-item-date">{new Date(data.created_at).toLocaleDateString()}</address>
            </div>
        </li>
    );
};