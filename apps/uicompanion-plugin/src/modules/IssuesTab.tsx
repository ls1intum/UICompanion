import RepositorySelection from "../components/RepositorySelection";
import {h} from "preact";
import {Bold, Divider, Text} from "@create-figma-plugin/ui";
import {Link} from 'react-router-dom';
import '!../output.css'
import {useContext} from "preact/compat";
import {UICompanionContext, UICompanionContextProps} from "../store/UICompanionContext";

const IssuesTab = () => {
    const uiCompanionContext: UICompanionContextProps = useContext(UICompanionContext);

    return (
        <div className="p-2">
            <div style={{
                marginBottom: '10px',
            }}>
                <RepositorySelection />
            </div>

            {
                uiCompanionContext.issues.map((issue) => {
                    return (
                        <div>
                            <Link to={`/detail/${issue.number}`} className="flex flex-row gap-2 justify-start items-center p-3">
                                <Text style={{
                                    color: '#B2B2B2',
                                }}>{`#${issue.number}`}</Text>
                                <Text><Bold>{issue.title}</Bold></Text>
                            </Link>
                            <Divider />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default IssuesTab