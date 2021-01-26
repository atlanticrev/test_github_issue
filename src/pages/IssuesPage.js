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
        fetch(`https://api.github.com/repos/${owner}/${repo}/issues?per_page=5`)
            .then(response => {
                if (!response.ok) {
                    // Go to catch block (is it correct?)
                    return false;
                }
                return response;
            })
            .then(response => response.json())
            .then(items => {
                onLoadEnd();
                setIssues(items);
            })
            .catch(err => {
                console.error(err);
                onLoadEnd();
                setShowError(true);
            });
    }

    return (
        <>
            <HeaderPanel>
                <IssuesForm onSubmitted={onSubmitted}/>
            </HeaderPanel>
            <ProgressBar
                progress={progress}
                setProgress={setProgress}
                isLoading={loading}
            />
            <List items={issues} />
            {showError && <ErrorWindow showError={setShowError}>Owner or Repository not found</ErrorWindow>}
        </>
    );
};