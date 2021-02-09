import React from 'react';
import { useState } from 'react';

import { List } from "../components/List";
import { IssuesForm } from "../components/IssuesForm";

import { HeaderPanel } from "../components/HeaderPanel";
import { ErrorWindow } from "../components/ErrorWindow";
import { ProgressBar } from "../components/ProgressBar";
import { DefaultIssueItem, IssueItem } from "../components/IssueItem";

export const IssuesPage = () => {
    const [issues, setIssues] = useState([]);
    const [showError, setShowError] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSubmitted = (owner, repo) => {
        /**
         * @param {string} url
         * @returns {Promise<any>}
         */
        const getData = (url) => {
            return fetch(url)
                .then(res => {
                    if (!res.ok) {
                        throw new Error('Response status is not OK');
                    }
                    return res;
                })
                .then(res => res.json())
                .catch(err => Promise.reject(err));
        };

        setLoading(true);

        getData(`https://api.github.com/repos/${owner}/${repo}/issues?per_page=${5}`)
            .then(data => {
                setLoading(false);
                setIssues(data);
            })
            .catch(err => {
                setLoading(false);
                setShowError(true);
                console.error(err);
            });
    }

    return (
        <>
            <HeaderPanel>
                <IssuesForm onSubmitted={onSubmitted} />
            </HeaderPanel>
            <ProgressBar isLoading={loading} />
            <List
                className="issues-list"
                itemsData={issues}
                render={itemData =>
                    <IssueItem
                        key={itemData.id}
                        itemData={itemData}
                    />
                }
                defaultItem={<DefaultIssueItem text="There are no issues" />}
            />
            {showError && <ErrorWindow setShowError={setShowError}>Owner or Repository not found</ErrorWindow>}
        </>
    );
};