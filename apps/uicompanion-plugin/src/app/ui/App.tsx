import React, { useState } from 'react';
import IssueOverviewPage from './pages/IssueOverviewPage';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import IssueDetailPage from './pages/IssueDetailPage';
import { getIssueMetadata } from '../services/@uicompanion-server/issueService';
import {getIssues, getIssuesResponseType} from "../services/@github/githubIssueService";
import {GithubIssue, IssueMetadata} from "@repo/shared";

function App() {

  const [issues, setIssues] = useState([] as GithubIssue[]);
  const [issueMetadata, setIssueMetadata] = useState([] as IssueMetadata[]);

  React.useEffect(() => {
    // This is how we read messages sent from the plugin controller
    window.onmessage = (event: { data: { pluginMessage: { type: any; message: any; }; }; }) => {
      const { type, message } = event.data.pluginMessage;
      if (type === 'create-frame') {
        console.log(`Figma Says: ${message}`);
      }
    };


    getIssues().then((response: getIssuesResponseType['data']) => {
      setIssues(response.map((issue): GithubIssue => {
        return {
          id: issue.id,
          url: issue.url,
          number: issue.number,
          state: issue.state,
          title: issue.title,
          body: issue.body,
        }
      }));
    });

    getIssueMetadata().then((issueMetadata: IssueMetadata[]) => {
      setIssueMetadata(issueMetadata);
    });
  }, []);

  return (
    <MemoryRouter initialEntries={["/overview"]}>
      <Routes>
        <Route path="/overview" element={<IssueOverviewPage issues={issues} issueMetadata={issueMetadata} />} />
        <Route path="/detail/:number" element={<IssueDetailPage issues={issues} issueMetadata={issueMetadata} />} />
      </Routes>
    </MemoryRouter>
  );
}

export default App;
