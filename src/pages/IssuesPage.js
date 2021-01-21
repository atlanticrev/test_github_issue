import React from 'react';
import { useState } from 'react';

import { List } from "../components/List";
import { IssuesForm } from "../components/IssuesForm";

import { HeaderPanel } from "../components/HeaderPanel";
import { ErrorWindow } from "../components/ErrorWindow";
import { ProgressBar } from "../components/ProgressBar";

export const IssuesPage = () => {
    const [issues, setIssues] = useState([]);
    const [showError, setShowError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    function onLoadStart () {
        setProgress(0);
        setLoading(true);
    }

    function onLoadEnd () {
        setProgress(100);
        setLoading(false);
    }

    function onSubmitted (owner, repo) {
        onLoadStart();
        fetch(`https://api.github.com/repos/${owner}/${repo}/issues`)
            .then(res => res.json())
            .then(items => {
                onLoadEnd();
                setIssues(items);
            })
            .catch(err => {
                onLoadEnd();
                setShowError(true);
                console.log(err);
            });
    }

    return (
        <>
            <HeaderPanel>
                <IssuesForm onSubmitted={onSubmitted} />
            </HeaderPanel>
            {loading && <ProgressBar progress={progress} setProgress={setProgress} />}
            <List items={issues} />
            {showError && <ErrorWindow>There is no issues has been found</ErrorWindow>}
        </>
    );
};