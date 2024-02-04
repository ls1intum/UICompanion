import { EventHandler } from '@create-figma-plugin/utilities'
import {GithubIssue} from "@repo/shared";

export interface CreateFrameHandler extends EventHandler {
    name: 'CREATE_FRAME'
    handler: (githubIssue: GithubIssue) => void
}

export interface PersistFrameHandler extends EventHandler {
    name: 'PERSIST_FRAME'
    handler: (frame: string) => void
}

export interface CloseHandler extends EventHandler {
    name: 'CLOSE'
    handler: () => void
}

export interface SaveSettingsHandler extends EventHandler {
    name: 'SAVE-SETTINGS'
    handler: (token: string) => void
}

export interface ReadSettingsHandler extends EventHandler {
    name: 'READ-SETTINGS'
    handler: (key: string) => void
}

export interface UseSettingsHandler extends EventHandler {
    name: 'USE-SETTINGS'
    handler: (token: string) => void
}