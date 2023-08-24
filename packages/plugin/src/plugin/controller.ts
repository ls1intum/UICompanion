figma.showUI(__html__, { width: 400, height: 550 });

figma.ui.onmessage = (msg) => {
  if (msg.type === 'create-frame') {
    const nodes = [];

    const frame = figma.createFrame();
    frame.x = 150;
    frame.name = `#${msg.issueId} Mockup`;
    figma.currentPage.appendChild(frame);
    nodes.push(frame);

    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);

    // This is how figma responds back to the ui
    figma.ui.postMessage({
      type: 'create-frame',
      message: `Created Frame`,
    });
  }

  figma.closePlugin();
};
