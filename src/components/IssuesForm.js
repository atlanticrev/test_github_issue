import React from 'react';
import { useState } from 'react';

import { Form } from "./Form";
import { Input } from "./Input";
import { Button } from "./Button";

export const IssuesForm = (props) => {
    const [owner, setOwner] = useState('');
    const [repo, setRepo] = useState('');

    const [ownerValidity, setOwnerValidity] = useState(true);
    const [repoValidity, setRepoValidity] = useState(true);

    function onSubmit (e) {
        e.preventDefault();
        console.log('submit', owner, repo);
        // Check all fields
        owner ? setOwnerValidity(true) : setOwnerValidity(false);
        repo ? setRepoValidity(true) : setRepoValidity(false);
        // Callback if form is valid
        if (owner && repo) {
            props.onSubmitted && props.onSubmitted(owner, repo);
        }
    }

    function onChange (e) {
        switch (e.target.name) {
            case 'owner':
                setOwnerValidity(true);
                setOwner(e.target.value);
                break;
            case 'repo':
                setRepoValidity(true);
                setRepo(e.target.value);
                break;
            default:
                break;
        }
    }

    return (
        <Form>
            <Input
                type="text"
                name="owner"
                placeholder="Owner"
                value={owner}
                onChange={onChange}
                isValid={ownerValidity}
                errorMsg="Fill the owner field"
            />
            <Input
                type="text"
                name="repo"
                placeholder="Repository"
                value={repo}
                onChange={onChange}
                isValid={repoValidity}
                errorMsg="Fill the repository field"
            />
            <Button
                onClick={onSubmit}
            >
                Search
            </Button>
        </Form>
    );
};