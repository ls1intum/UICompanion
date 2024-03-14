import {h} from "preact";
import {Bold, Button, IconButton, IconPlus32, Link, Muted, Text} from "@create-figma-plugin/ui";
import '!../output.css'
import {useNavigate, useParams} from "react-router-dom";
import {UICompanionContext} from "../store/UICompanionContext";
import {useContext, useEffect, useState} from "preact/compat";
import {emit, on} from "@create-figma-plugin/utilities";
import UICompanionAPI from "../services/UICompanionAPI";
import {GithubIssue, IssueMetadata, MockupProgress} from "@repo/shared";
import {PersistFrameHandler} from "../types";
import gitHubAPI from "../services/GitHubAPI";

const DetailsPage = () => {
    const navigate = useNavigate();
    const params = useParams();
    const { issues, selectedRepository, repositories, username } = useContext(UICompanionContext);

    const [uiCompanionAPI, setUiCompanionAPI] = useState<UICompanionAPI>(UICompanionAPI.getInstance("https://corsproxy.io/?https://uicompanion.ase.cit.tum.de"));
    const [currentIssue, setCurrentIssue] = useState({} as GithubIssue);
    const [selectedIssueMetadata, setSelectedIssueMetadata] = useState({} as IssueMetadata);

    on<PersistFrameHandler>('PERSIST_FRAME', (frame) => {
        uiCompanionAPI.updateIssueMetadata({
            ...selectedIssueMetadata,
            frames: [...selectedIssueMetadata.frames, frame]
        }).then(newIssueMetadata => {
            setSelectedIssueMetadata(newIssueMetadata);
        });
    });

    // Get the selected issue
    useEffect(() => {
        const issue = issues?.find((issue: any) => issue.number.toString() === params.number);
        setCurrentIssue(issue);
    }, [params.number, issues]);

    // Get the metadata of the selected issue
    useEffect(() => {
        const selectedIssueMetadata = uiCompanionAPI.getIssueMetadata().then((metadata) => {
            const selectedIssueMetadata = metadata.find((issueMetadata: IssueMetadata) => (issueMetadata.number as any as string) === params.number);
            if (selectedIssueMetadata === undefined) {
                console.log("No issue metadata found. Generating initial metadata...")
                uiCompanionAPI.createIssueMetadata({
                    repository_url: selectedRepository.repository_url,
                    number: selectedRepository.number,
                    progress: MockupProgress.OPEN,
                    frames: [],
                    prototypeUrls: []
                } as any as IssueMetadata).then((newIssueMetadata: IssueMetadata) => {
                    setSelectedIssueMetadata(newIssueMetadata);
                });

            } else {
                setSelectedIssueMetadata(selectedIssueMetadata);
            }
        });
    }, [uiCompanionAPI]);

    function findRepositoryOwner() {
        if (repositories?.userRepos.includes(selectedRepository)) {
            return username; // The owner is the current user
        }

        const orgNames = Object.keys(repositories?.orgRepos || {});
        for (const orgName of orgNames) {
            const repos = repositories.orgRepos[orgName];
            if (repos.includes(selectedRepository)) {
                return orgName; // Found the organization that owns the repository
            }
        }

        return null;
    }

    function handleClick() {
        navigate("/overview")
        console.log("Button clicked. Redirecting to /overview")
    }

    return (
        <div style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            padding: '10px 10px',
        }}>

            {/* --- ACTION BUTTONS --- */}
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '10px',
                marginBottom: '20px',
            }}>
                <Button secondary onClick={handleClick}>Back</Button>
                <Link href={`https://github.com/${findRepositoryOwner()}/${selectedRepository}/issues/${params.number}`} target="_blank"
                   style={{ textDecoration: 'none' }}>
                    <Button>Open in GitHub</Button>
                </Link>
            </div>

            {/* --- HEADER WRAPPER --- */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                gap: '15px',
            }}>

                {/* --- HEADER --- */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                }}>

                    {/* --- ISSUE ID --- */}
                    <Text style={{
                        color: '#b2b2b2',
                        fontSize: '14px',
                        fontWeight: 300,
                        letterSpacing: '0.14px',
                        lineHeight: '20px',
                    }}>
                        {"#" + params.number}
                    </Text>

                    {/* --- TITLE --- */}
                    <Text style={{
                        fontSize: '15px',
                        fontWeight: 600,
                        letterSpacing: '0.14px',
                        lineHeight: '20px',
                    }}>
                        {currentIssue.title}
                    </Text>
                </div>

                {/* --- DETAILS --- */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "10px"
                }}>
                    {
                        selectedIssueMetadata.frames?.map((frame) => {
                            return (
                                <div style={{
                                    width: "100%",
                                    height: "125px",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "flex-end",
                                    borderRadius: "8px",
                                    border: "2px solid #3B3B3B",
                                    backgroundImage: "url(https://picsum.photos/1440/1024)",
                                }}>
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        gap: "2px",
                                        width: "100%",
                                        height: "35%",
                                        background: "#2C2C2C",
                                        borderRadius: "0px 0px 5px 5px",
                                        padding: "10px",
                                    }}>
                                        <Text>
                                            <Bold>{frame}</Bold>
                                        </Text>
                                        <Muted>by bgeisb</Muted>
                                    </div>
                                </div>
                            )
                        })
                    }

                    <div
                        onClick={
                            () => {
                                emit('CREATE_FRAME', currentIssue)
                            }
                        }
                        style={{
                            width: "100%",
                            height: "125px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "8px",
                            border: "1px dashed #FFF"
                        }}>
                        <IconPlus32/>
                        <Text>Add Frame</Text>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default DetailsPage