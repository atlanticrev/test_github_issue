import React from 'react';
import { useState } from 'react';

import { List } from "../components/List";
import { IssuesForm } from "../components/IssuesForm";

import { HeaderPanel } from "../components/HeaderPanel";
import { ErrorWindow } from "../components/ErrorWindow";
import { ProgressBar } from "../components/ProgressBar";
import { IssueItem } from "../components/IssueItem";

export const IssuesPage = () => {
    const [issues, setIssues] = useState([]);
    const [showError, setShowError] = useState(false);
    const [loading, setLoading] = useState(false);

    // const getData = (url) => {
    //     return fetch(url)
    //         // @todo working with 404 and other answer codes
    //         .then(res => {
    //             if (!res.ok) {
    //                 throw new Error('Response status is not OK');
    //             }
    //             return res;
    //         })
    //         .then(res => res.json())
    //         .catch(err => console.log(err));
    // };

    const onSubmitted = (owner, repo) => {
        setLoading(true);

        // getData()
        //     .then(data => {
        //         setLoading(false);
        //         setIssues(data);
        //     })
        //     .catch(err => {
        //         setLoading(false);
        //         setShowError(true);
        //     });

        // @todo need to refactor
        fetch(`https://api.github.com/repos/${owner}/${repo}/issues?per_page=${5}`)
            // @todo working with 404 and other answer codes
            .then(response => {
                if (!response.ok) {
                    // @todo go to catch block
                    return false;
                }
                return response;
            })
            .then(response => response.json())
            .then(items => {
                setLoading(false);
                setIssues(items);
            })
            .catch(() => {
                setLoading(false);
                setShowError(true);
            });
    }

    return (
        <>
            <HeaderPanel>
                <IssuesForm
                    onSubmitted={onSubmitted}
                />
            </HeaderPanel>
            <ProgressBar
                isLoading={loading}
            />
            <List
                className="issues-list"
                itemsData={issues}
                render={itemData =>
                    <IssueItem
                        key={itemData.id}
                        itemData={itemData}
                    />
                }
                defaultItem={true}
            />
            {showError && <ErrorWindow showError={setShowError}>Owner or Repository not found</ErrorWindow>}
        </>
    );
};