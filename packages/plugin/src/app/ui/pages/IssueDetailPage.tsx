import React, { useEffect, useMemo } from 'react';
import { Button, Type } from 'react-figma-ui';
import { useNavigate, useParams } from 'react-router';
import { Issue } from '../../models/Issue';
import { VerticalStepper } from '../modules/VerticalStepper';
import { IssueStatus } from '../../models/IssueStatus';

interface IssueDetailPageProps {
  issues: Issue[];
  updateIssuesState: (newIssues: Issue[]) => void;
}

const IssueDetailPage = (props: IssueDetailPageProps) => {
  const params = useParams();
  const navigate = useNavigate();

  const findIssueByNumber = (number: string) => props.issues.find((issue: Issue) => issue.number.toString() === number);

  const currentIssue = useMemo(() => findIssueByNumber(params.number), [props.issues, params.number]);

  const backButtonHandler = React.useCallback((e) => {
    e.preventDefault();
    navigate("/overview");
  }, [navigate]);


  useEffect(() => {
    const handleMessage = async (e) => {
      console.log("UI LOG", e.data.pluginMessage);

      const updatedIssue: Issue = {
        ...currentIssue,
        status: IssueStatus.IN_PROGRESS,
        frames: [...currentIssue.frames as string[], e.data.pluginMessage.message],
      };

      const updatedIssues = props.issues.map((issue) =>
        issue.number.toString() === params.number ? updatedIssue : issue
      );

      props.updateIssuesState(updatedIssues);
    };

    window.onmessage = handleMessage;

    return () => {
      // Cleanup when unmounting
      window.onmessage = null;
    };
  }, [currentIssue, params.number, props]);

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