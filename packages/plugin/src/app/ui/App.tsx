import React, { useState } from 'react';
import IssueOverviewPage from './pages/IssueOverviewPage';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import IssueDetailPage from './pages/IssueDetailPage';
import { Issue } from '../models/Issue';
import { IssueStatus } from '../models/IssueStatus';

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

    
    // const fetchData = async () => {
    //     const issues = await getIssues()
    //     setIssues(issues)

    //     return issues
    // }

    // fetchData()
    //     .catch(err => console.log(err))

    setIssues([
      {
          id: 2357,
          title: 'Development: Delete temporary directories for programming exercises consistently',
          description: 'Issue 1 description',
          status: IssueStatus.OPEN,
          frames: []
      },
      {
          id: 2380,
          title: 'Communication: Introduce course-wide channels',
          description: 'Issue 2 description',
          status: IssueStatus.OPEN,
          frames: []
      },
      {
          id: 9643,
          title: 'Assessment: Fix grading scale inclusivity not displayed correctly',
          description: 'Issue 3 description',
          status: IssueStatus.OPEN,
          frames: []
      },
      {   
          id: 2980,
          title: 'Development: Delete temporary directories for programming exercises consistently',
          description: 'Issue 4 description',
          status: IssueStatus.IN_PROGRESS,
          frames: []
      },
      {
          id: 6285,
          title: 'Communication: Introduce course-wide channels',
          description: 'Issue 5 description',
          status: IssueStatus.IN_PROGRESS,
          frames: []
      },
    ])
  }, []);

  return (
    <MemoryRouter initialEntries={["/overview"]}>
      <Routes>
          <Route path="/overview" element={<IssueOverviewPage issues={issues} />} />
          <Route path="/detail/:id" element={<IssueDetailPage issues={issues} />} /> 
      </Routes>
    </MemoryRouter>
  );
}

export default App;
