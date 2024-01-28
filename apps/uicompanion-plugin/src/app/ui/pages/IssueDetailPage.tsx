import React, {useEffect, useMemo} from 'react';
import {Button, Type} from 'react-figma-ui';
import {useNavigate, useParams} from 'react-router';
import {VerticalStepper} from '../modules/VerticalStepper';
import {updateIssueMetadata} from '../../services/@uicompanion-server/issueService';
import {postPrototype} from '../../services/@uicompanion-server/prototypeService';
import {confirmPrototypes} from '../../services/@uicompanion-server/messageService';
import {GithubIssue, IssueMetadata, MockupProgress} from "@repo/shared";


interface IssueDetailPageProps {
  issues: GithubIssue[];
  issueMetadata: IssueMetadata[];
}
const IssueDetailPage = (props: IssueDetailPageProps) => {
  const params = useParams();
  const navigate = useNavigate();

  const getFullIssueByNumber = (number: string) => {
    const issue = props.issues.find((issue: GithubIssue) => issue.number.toString() === number);
    const issueMetadata = props.issueMetadata.find((issueMetadata: IssueMetadata) => issueMetadata.number.toString() === number);

    return { issue, issueMetadata };
  };

  const currentIssue = useMemo(() => getFullIssueByNumber(params.number), [props.issues, params.number]);

  const backButtonHandler = React.useCallback((e) => {
    e.preventDefault();
    navigate("/overview");
  }, [navigate]);


  useEffect(() => {
    window.onmessage = async (e) => {
      const pluginMessage = e.data.pluginMessage;

      console.log(`Received message from figma: ${pluginMessage.type}`);

      switch (pluginMessage.type) {
        case 'create-frame': {
          // Persist the created frame in the current issue
          const updatedIssueMetadata: IssueMetadata = {
            ...currentIssue.issueMetadata,
            progress: MockupProgress.IN_PROGRESS,
            frames: [...currentIssue.issueMetadata.frames as string[], e.data.pluginMessage.message],
          };

          // TODO: might be unnecessary
          props.issueMetadata = props.issueMetadata.map((issue: IssueMetadata) =>
              issue.number.toString() === params.number ? updatedIssueMetadata : issue
          );
          await updateIssueMetadata(updatedIssueMetadata);
          break;
        }
        case 'export-prototype': {
          const exportedBytes: Uint8Array[] = e.data.pluginMessage.message;
          const prototypeURLs: string[] = [];

          for (const bytes of exportedBytes) {
            const response = await postPrototype(bytes);
            prototypeURLs.push(response.url);
          }

          console.log("Prototype URLs: ", prototypeURLs);

          // Persist the prototype urls in the current issue
          const updatedIssueMetadata: IssueMetadata = {
            ...currentIssue.issueMetadata,
            prototypeUrls: [...currentIssue.issueMetadata.prototypeUrls as string[], ...prototypeURLs],
          };

          const persistedIssue = await updateIssueMetadata(updatedIssueMetadata);

          // Inform the plugin that the prototypes have been persisted
          await confirmPrototypes(persistedIssue)

          break;
        }
        default: {
          console.log(`Unknown message type: ${pluginMessage.type}`);
        }
      }
    };

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
          {"#" + currentIssue.issue.number}
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
          {currentIssue.issue.title}
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
        <VerticalStepper issue={currentIssue.issue} issueMetadata={currentIssue.issueMetadata} />
      </div>

    </div>
  );
};

export default IssueDetailPage;