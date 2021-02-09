import React from 'react';

import { ProfileBlock } from "./ProfileBlock";

/**
 * @typedef {Object} IssueItemData
 * @property {string} title
 * @property {number} number
 * @property {string} created_at
 * @property {string} login
 */

export const IssueItem = ({ /** @type IssueItemData */ itemData }) => {
    return (
        <li className="issue-item">
            <ProfileBlock
                img={itemData.user.avatar_url}
                link={itemData.user.html_url}
                userName={itemData.user.login}
            />
            <div className="issue-description">
                <h2 className="issue-title">{itemData.title}</h2>
                <p className="issue-number">No. {itemData.number.toString()}</p>
                <address className="issue-date">{new Date(itemData.created_at).toLocaleDateString()}</address>
            </div>
        </li>
    );
};

export const DefaultIssueItem = ({ text }) => {
    return (
        <li className="issue-item default">
            <h2>{text}</h2>
        </li>
    );
};