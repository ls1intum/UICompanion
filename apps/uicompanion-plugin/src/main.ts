import {emit, on, once, showUI} from '@create-figma-plugin/utilities'
import {
  CloseHandler,
  CreateFrameHandler, PersistFrameHandler,
  ReadSettingsHandler,
  SaveSettingsHandler, UseSettingsHandler
} from "./types";
import {GithubIssue} from "@repo/shared";

export default function () {
  on<CreateFrameHandler>('CREATE_FRAME', function (githubIssue: GithubIssue) {
    const nodes: Array<SceneNode> = []

    const frame = figma.createFrame();
    frame.resize(1440, 1024)
    frame.name = `#${githubIssue.number} ${githubIssue.title}`;
    figma.currentPage.appendChild(frame);
    nodes.push(frame);

    figma.currentPage.selection = nodes
    figma.viewport.scrollAndZoomIntoView(nodes)

    emit<PersistFrameHandler>('PERSIST_FRAME', frame.name)
  })

  once<CloseHandler>('CLOSE', function () {
    figma.closePlugin()
  })

  on<SaveSettingsHandler>('SAVE-SETTINGS', function (token: string) {
    /**
     * Sets a value to client storage with the given key.
     * The returned promise will resolve if storage is successful, or reject with an error message if storage failed.
     */
    figma.clientStorage
        .setAsync('token', token)
        .then(() => console.log('Settings saved'))
  })

  on<ReadSettingsHandler>('READ-SETTINGS', function (key: string) {
    /**
     * Retrieves a value from client storage with the given key.
     * If no value has been stored for that key, this function will asynchronously return undefined.
     */
    figma.clientStorage
        .getAsync(key)
        .then((token) => {
          if (token !== undefined) {
            emit<UseSettingsHandler>('USE-SETTINGS', token.token)
          } else {
            console.log('No token found')
          }
        })

  })

  showUI({
    height: 550,
    width: 400
  })
}
