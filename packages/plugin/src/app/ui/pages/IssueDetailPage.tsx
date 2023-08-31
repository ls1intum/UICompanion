import React, { useEffect } from 'react';
import { Button, Type } from 'react-figma-ui';
import { useNavigate, useParams } from 'react-router';
import { Issue } from '../../models/Issue';
import { VerticalStepper } from '../modules/VerticalStepper';
import { updateIssue } from '../../services/issueService';
import { IssueStatus } from '../../models/IssueStatus';

interface IssueDetailPageProps {
  issues: Issue[];
  updateIssuesState: (newIssues: Issue[]) => void;
}

const IssueDetailPage = (props: IssueDetailPageProps) => {
  const params = useParams();
  const navigate = useNavigate();

  const currentIssueIndex = props.issues.findIndex((issue: Issue) => issue.number.toString() === params.number);
  var currentIssue: Issue = currentIssueIndex !== -1 ? props.issues[currentIssueIndex] : undefined;

  const backButtonHandler = (e) => {
    e.preventDefault();
    navigate("/overview");
  };

  useEffect(() => {
    window.onmessage = async (e) => {
      console.log("UI LOG", e.data.pluginMessage)

      const updatedIssue: Issue = {
        ...currentIssue,
        status: IssueStatus.IN_PROGRESS,
        frames: [
          ...currentIssue.frames as string[],
          e.data.pluginMessage.message,
        ],
      }
      props.issues[currentIssueIndex] = await updateIssue(updatedIssue);
      props.updateIssuesState(props.issues)
    };
  }, []);

  return (
    <div style={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      padding: '10px 10px',
    }}>

      {/* --- HEADER WRAPPER --- */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
      }}>

        {/* --- HEADER --- */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0px',
        }}>
          
          {/* --- ISSUE ID --- */}
          <Type size="large" weight="medium" style={{ 
            color: '#b2b2b2',
            fontSize: '14px',
            fontWeight: 300,
            letterSpacing: '0.14px',
            lineHeight: '20px',
          }}>
          {"#" + currentIssue.number}
          </Type>

          {/* --- TITLE --- */}
          <Type
          size="large"
          weight="bold"
          style={{
            fontSize: '15px',
            fontWeight: 600,
            letterSpacing: '0.14px',
            lineHeight: '20px',
          }}>
          {currentIssue.title}
          </Type>
        </div>
    
        {/* --- ACTION BUTTONS --- */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '10px',
        }}>
          <Button tint="secondary" onClick={backButtonHandler}>Back</Button>
          {/* TODO: Change href to https://github.com/ls1intum/Artemis/issues/{issueID}} */}
          <a href="https://github.com/ls1intum/Artemis/issues" target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
            <Button tint="secondary">Open in GitHub</Button>
          </a>
        </div>

      </div>

      {/* --- STEPPER --- */}
      <div style={{
        padding: '20px 10px',
      }}>
        <VerticalStepper currentIssue={currentIssue} />
      </div>

    </div>
  );
};

export default IssueDetailPage;