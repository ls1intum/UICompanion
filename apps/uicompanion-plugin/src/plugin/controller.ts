figma.showUI(__html__, { width: 400, height: 550 });

figma.ui.onmessage = (msg) => {
  switch (msg.type) {
    case 'create-frame': {
      const nodes = [];

      const frame = figma.createFrame();
      frame.resize(1440, 1024)
      frame.name = `#${msg.currentIssue.number} ${msg.currentIssue.title}`;
      figma.currentPage.appendChild(frame);
      nodes.push(frame);

      figma.currentPage.selection = nodes;
      figma.viewport.scrollAndZoomIntoView(nodes);

      // This is how figma responds back to the ui
      figma.ui.postMessage({
        type: 'create-frame',
        message: frame.id,
      });
      break;
    }
    case 'export-prototype': {
      const frameIds: string[] = msg.currentIssue.frames || [];
      let exportedBytes: Uint8Array[] = []

      frameIds.forEach(async (frameId) => {
        const node = figma.getNodeById(frameId) as FrameNode;

        await node.exportAsync({
          format: 'PNG',
          constraint: { type: 'SCALE', value: 2 },
        }).then((bytes) => {
          exportedBytes.push(bytes)

          figma.ui.postMessage({
            type: 'export-prototype',
            message: exportedBytes,
          });
        });
      });
      
      

      break;
    }
    default: {
      figma.ui.postMessage({
        type: 'error',
        message: `Message type ${msg.type} not recognized.`,
      });
    }
  }

  // figma.closePlugin();
};
