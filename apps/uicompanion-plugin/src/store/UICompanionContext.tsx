import {h} from "preact";
import {createContext} from "preact";
import {useState} from "preact/compat";
import {GetIssuesResponseType, GetReposResponse} from "../services/GitHubAPI";
import {StateUpdater} from "preact/hooks";

export interface UICompanionContextProps {
    githubToken: string,
    setGithubToken: StateUpdater<string>,
    username: string,
    setUsername: StateUpdater<string>,
    organizations: string[],
    setOrganizations: StateUpdater<string[]>,
    repositories: GetReposResponse | undefined,
    setRepositories: StateUpdater<GetReposResponse | undefined>,
    currentTab: string,
    setCurrentTab: StateUpdater<string>,
    selectedRepository: string,
    setSelectedRepository: StateUpdater<string>
    issues: GetIssuesResponseType['data'],
    setIssues: StateUpdater<GetIssuesResponseType['data']>
}

export const UICompanionContext = createContext<any>(null);
export const UICompanionContextProvider = ({children}: any) => {
    // GitHUB API
    const [githubToken, setGithubToken] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [organizations, setOrganizations] = useState<string[]>([]);
    const [repositories, setRepositories] = useState<GetReposResponse | undefined>(undefined);
    const [currentTab, setCurrentTab] = useState<string>('Issues');
    const [issues, setIssues] = useState<GetIssuesResponseType['data']>([]);

    // Application State
    const [selectedRepository, setSelectedRepository] = useState<string>('');

    const contextValue: UICompanionContextProps = {
        githubToken, setGithubToken,
        username, setUsername,
        organizations, setOrganizations,
        repositories, setRepositories,
        currentTab, setCurrentTab,
        selectedRepository, setSelectedRepository,
        issues, setIssues
    }

    return (
        <UICompanionContext.Provider  value={contextValue}>
            {children}
        </UICompanionContext.Provider>
    );
}