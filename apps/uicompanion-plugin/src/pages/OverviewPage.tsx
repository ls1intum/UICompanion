import { h } from "preact";
import { LoadingIndicator, MiddleAlign, Tabs, TabsOption } from "@create-figma-plugin/ui";
import { useContext, useEffect, useState } from "preact/compat";
import { emit, on } from "@create-figma-plugin/utilities";
import { UseSettingsHandler } from "../types";
import GitHubAPI from "../services/GitHubAPI";
import IssuesTab from "../modules/IssuesTab";
import '!../output.css';
import SettingsTab from "../modules/SettingsTab";
import { UICompanionContext, UICompanionContextProps } from "../store/UICompanionContext";

const OverviewPage = () => {
    const uiCompanionContext = useContext(UICompanionContext);
    const [githubApi, setGithubApi] = useState<GitHubAPI | undefined>(undefined);

    // Read settings once on component mount
    useEffect(() => {
        emit('READ-SETTINGS', 'token');
    }, []);

    // Listen for settings update
    useEffect(() => {
        on<UseSettingsHandler>('USE-SETTINGS', (token) => {
            uiCompanionContext.setGithubToken(token);
            const api = GitHubAPI.getInstance(token);
            setGithubApi(api); // Initialize GitHub API instance once token is received
        });
    }, [uiCompanionContext]);

    // Fetch user and organizations once GitHub API instance is ready and token is set
    useEffect(() => {
        if (!githubApi || uiCompanionContext.githubToken === '') return;

        githubApi.getUser().then(user => {
            uiCompanionContext.setUsername(user.login);
        });

        githubApi.getOrganizations().then(orgs => {
            const organizations = orgs.map(org => org.organization.login);
            uiCompanionContext.setOrganizations(organizations);
        });
    }, [githubApi, uiCompanionContext.githubToken]);

    // Fetch repositories once username and organizations are set
    useEffect(() => {
        if (!githubApi || uiCompanionContext.username === '') return;

        githubApi.getRepos(uiCompanionContext.username, uiCompanionContext.organizations)
            .then(repos => {
                uiCompanionContext.setRepositories(repos);
                if (uiCompanionContext.selectedRepository === '') {
                    const allRepos = [
                        ...repos.userRepos,
                        ...Object.values(repos.orgRepos).flat(),
                    ];
                    uiCompanionContext.setSelectedRepository(allRepos.length > 0 ? allRepos[0] : '');
                }
            })
            .catch(error => console.error('Error while fetching repositories: ', error));
    }, [githubApi, uiCompanionContext.username, uiCompanionContext.organizations]);

    // Fetch issues once a repository is selected
    useEffect(() => {
        if (!githubApi || uiCompanionContext.selectedRepository === '') return;

        const { username, selectedRepository, repositories } = uiCompanionContext;
        let owner = repositories.userRepos.includes(selectedRepository) ? username : repositories.orgRepos[selectedRepository];

        githubApi.getIssues(owner, selectedRepository).then(issues => {
            uiCompanionContext.setIssues(issues);
        }).catch(error => console.error('Error fetching issues: ', error));
    }, [githubApi, uiCompanionContext.selectedRepository, uiCompanionContext.repositories]);

    const options: Array<TabsOption> = [{
        children: (!uiCompanionContext.repositories || uiCompanionContext.selectedRepository === '') ?
            <MiddleAlign style={{ height: '90%' }}><LoadingIndicator /></MiddleAlign> : <IssuesTab />,
        value: 'Issues'
    }, {
        children: <SettingsTab githubToken={uiCompanionContext.githubToken} setGithubToken={uiCompanionContext.setGithubToken} />,
        value: 'Settings'
    }];

    function handleValueChange(newValue: string) {
        uiCompanionContext.setCurrentTab(newValue);
    }

    return <Tabs onValueChange={handleValueChange} options={options} value={uiCompanionContext.currentTab} />;
};

export default OverviewPage;
