interface GithubIssue {
    id: number;
    url: string;
    number: number;
    state: string;
    title: string;
    body: string;
}

export default GithubIssue;