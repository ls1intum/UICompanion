import React from 'react';
import { Chip } from '../components/Chip';
import IssueListItem from '../modules/IssueListItem';
import {GithubIssue, IssueMetadata} from "@repo/shared";

interface IssueOverviewPageProps {
    issues: GithubIssue[];
    issueMetadata: IssueMetadata[];
}

const IssueOverviewPage = (props: IssueOverviewPageProps) => {

    return (
        <div style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            padding: '20px 10px',
        }}>
            <Chip backgroundColor={'#34C759'}>Open</Chip>

            <div style={{ 
                width: '100%',
                padding: '10px 0 25px 0',
            }}>
                {props.issues
                    .map((issue: GithubIssue, index: number) => (
                        <div key={issue.number}>
                            <IssueListItem
                                issue={issue}
                            />

                            {/* Add a divider between the Issue Components */}
                            {index !== props.issues.length - 1 && <hr style={{ margin: '10px 0', border: 'none', borderBottom: '1px solid #B2B2B2', opacity: 0.1 }} />}
                        </div>
                    )
                )}
            </div>

            <Chip backgroundColor={'#E05534'}>In Progress</Chip>  

            <div style={{ 
                width: '100%',
                padding: '10px 0 25px 0',
            }}>
                {props.issues
                    .map((issue: GithubIssue, index: number) => (
                        <div key={issue.number}>
                            <IssueListItem
                                issue={issue}
                            />

                            {/* Add a divider between the Issue Components */}
                            {index !== props.issues.length - 1 && <hr style={{ margin: '10px 0', border: 'none', borderBottom: '1px solid #B2B2B2', opacity: 0.1 }} />}
                        </div>
                    )
                )}
            </div>


        </div>

    );
}

export default IssueOverviewPage;
