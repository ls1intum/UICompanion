import React, { useState } from 'react';
import '../styles/ui.css';
import { Button, Input } from 'react-figma-ui';

function App() {
  const [issueId, setIssueId] = useState(''); 

  const textbox = React.useRef<HTMLInputElement>(undefined);

  const issueIdRef = React.useCallback((element: HTMLInputElement) => {
    if (element) element.value = '5';
    textbox.current = element;
  }, []);

  const onCreate = () => {
    // Use Figma Plugin API to create a frame with the size of 1920x1080 and the name "Test Frame"
    console.log(issueIdRef);
    parent.postMessage({ pluginMessage: { type: 'create-frame', issueId } }, '*');
  };

  React.useEffect(() => {
    // This is how we read messages sent from the plugin controller
    window.onmessage = (event) => {
      const { type, message } = event.data.pluginMessage;
      if (type === 'create-frame') {
        console.log(`Figma Says: ${message}`);
      }
    };
  }, []);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      paddingRight: '50px',
      paddingLeft: '50px',
      gap: '10px',
    }}>
      <h2>Create Mockup Frame</h2>
      <Input 
        placeholder="Issue ID" 
        value={issueId}
        onChange={e => setIssueId((e.target as HTMLInputElement).value)}
      />

      <Button id="create" tint="primary" onClick={onCreate}> 
        Create 
      </Button>
    </div>
  );
}

export default App;
