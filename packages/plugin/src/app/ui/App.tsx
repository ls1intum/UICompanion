import React, { useState } from 'react';
import IssueOverviewPage from './pages/IssueOverviewPage';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import IssueDetailPage from './pages/IssueDetailPage';
import { Issue } from '@ls1intum/uicompanion-shared/models/Issue';
import { getIssues } from '../services/issueService';

function App() {

  const [issues, setIssues] = useState([] as Issue[]); 

  React.useEffect(() => {
    // This is how we read messages sent from the plugin controller
    window.onmessage = (event) => {
      const { type, message } = event.data.pluginMessage;
      if (type === 'create-frame') {
        console.log(`Figma Says: ${message}`);
      }
    };

    
    getIssues().then((issues: Issue[]) => {
      setIssues(issues);
    });
  }, []);

  const updateIssuesState = (newIssues: Issue[]) => {
    setIssues(newIssues);
  }

  return (
    <MemoryRouter initialEntries={["/overview"]}>
      <Routes>
        <Route path="/overview" element={<IssueOverviewPage issues={issues} />} />
        <Route path="/detail/:number" element={<IssueDetailPage issues={issues} updateIssuesState={updateIssuesState} />} /> 
      </Routes>
    </MemoryRouter>
  );
}

export default App;
